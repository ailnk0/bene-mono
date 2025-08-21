import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import { Command } from 'commander';
import { execa } from 'execa';
import prompts from 'prompts';

export const initAction = async () => {
  try {
    // Prompt
    const { type: templateType, name: templateName } = await prompts([
      {
        type: 'select',
        name: 'type',
        message: 'Select a monorepo template:',
        choices: [
          {
            title: 'Turbo v2 | Vite v7  | React v19 | Tailwind v4 | shadcn (Default)',
            value: 'turbo2-vite7-react19-tailwind4-shadcn',
          },
          {
            title: 'Turbo v2 | Next v15 | React v19 | Tailwind v4 | shadcn',
            value: 'turbo2-next15-react19-tailwind4-shadcn',
          },
        ],
        initial: 0,
      },
      {
        type: 'text',
        name: 'name',
        message: 'Project name:',
        initial: 'my-monorepo',
        format: (value: string) => value.trim(),
        validate: (value: string) =>
          value.length > 128 ? `Name should be less than 128 characters.` : true,
      },
    ]);
    const cwd = process.cwd();
    const projectPath = path.join(cwd, templateName);
    console.log(`Creating a new project in ${projectPath}...`);

    // Path validation.
    try {
      await fs.access(cwd, fs.constants.W_OK);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    if (fs.existsSync(path.resolve(cwd, templateName, 'package.json'))) {
      console.error(`A project with the name ${templateName} already exists.`);
      process.exit(1);
    }

    // Download template
    const repo = 'bene-mono';
    const branch = 'main';
    const templateUrl = `https://codeload.github.com/ailnk0/${repo}/tar.gz/${branch}`;
    const templatePath = path.join(os.tmpdir(), `${repo}-${Date.now()}`);
    await fs.ensureDir(templatePath);
    const response = await fetch(templateUrl);
    if (!response.ok) {
      throw new Error(`Failed to download template: ${response.statusText}`);
    }
    const tarPath = path.resolve(templatePath, 'template.tar.gz');
    await fs.writeFile(tarPath, Buffer.from(await response.arrayBuffer()));

    // Extract template from tar
    await execa('tar', [
      '-xzf',
      tarPath,
      '-C',
      templatePath,
      '--strip-components=2',
      `${repo}-${branch}/templates/${templateType}`,
    ]);
    const extractedPath = path.resolve(templatePath, templateType);
    await fs.move(extractedPath, projectPath);

    // Clean up
    await fs.remove(templatePath);

    console.log(`Created a new ${templateType}.`);
  } catch (error) {
    console.error(error);
  }
};

export const init = new Command()
  .name('init')
  .description('Initialize a monorepo project')
  .action(initAction);
