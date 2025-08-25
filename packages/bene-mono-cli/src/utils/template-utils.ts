import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';

export async function downloadTemplate(options: { templatePath: string; targetPath: string }) {
  const { templatePath, targetPath } = options;
  const repo = 'bene-mono';
  const branch = 'main';
  const templateUrl = `https://codeload.github.com/ailnk0/${repo}/tar.gz/${branch}`;
  const tempDir = path.join(os.tmpdir(), `${repo}-${Date.now()}`);
  await fs.ensureDir(tempDir);

  try {
    const response = await fetch(templateUrl);
    if (!response.ok) {
      throw new Error(`Failed to download template: ${response.statusText}`);
    }
    const tarPath = path.resolve(tempDir, 'template.tar.gz');
    await fs.writeFile(tarPath, Buffer.from(await response.arrayBuffer()));

    await execa('tar', [
      '-xzf',
      tarPath,
      '-C',
      tempDir,
      '--strip-components=2',
      `${repo}-${branch}/templates/${templatePath}`,
    ]);
    const extractedPath = path.resolve(tempDir, templatePath);
    await fs.move(extractedPath, targetPath);
  } finally {
    await fs.remove(tempDir);
  }
}

export function findMonorepoRoot(startDir: string): string | null {
  let currentDir = startDir;
  while (currentDir !== path.parse(currentDir).root) {
    if (fs.existsSync(path.join(currentDir, 'pnpm-workspace.yaml'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  if (fs.existsSync(path.join(currentDir, 'pnpm-workspace.yaml'))) {
    return currentDir;
  }
  return null;
}

export async function replaceInFiles(dir: string, search: string, replace: string) {
  if (search === replace) {
    return;
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        await replaceInFiles(fullPath, search, replace);
      }
    } else if (entry.isFile()) {
      try {
        const content = await fs.readFile(fullPath, 'utf-8');
        if (content.includes(search)) {
          const newContent = content.replace(new RegExp(search, 'g'), replace);
          await fs.writeFile(fullPath, newContent, 'utf-8');
        }
      } catch {
        // ignore binary files
      }
    }
  }
}
