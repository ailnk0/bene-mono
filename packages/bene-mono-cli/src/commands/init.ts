import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import { Command } from 'commander';
import { execa } from 'execa';
import prompts from 'prompts';

export const init = new Command()
  .name('init')
  .description('initialize monorepo project')
  .action(async () => {
    try {
      // Prompt
      const { type: templateType, name: templatName } = await prompts([
        {
          type: 'select',
          name: 'type',
          message: 'Select a monorepo template: ',
          choices: [
            { title: 'Next.js', value: 'monorepo-next' },
            { title: 'Vite-React', value: 'monorepo-vite' },
          ],
          initial: 0,
        },
        {
          type: 'text',
          name: 'name',
          message: 'Project name: ',
          initial: 'my-monorepo',
          format: (value: string) => value.trim(),
          validate: (value: string) => (value.length > 128 ? `Name should be less than 128 characters.` : true),
        },
      ]);
      const cwd = process.cwd();
      const projectPath = path.join(cwd, templatName);
      console.log(`Creating a new project in ${projectPath}...`);

      // Path validation.
      try {
        await fs.access(cwd, fs.constants.W_OK);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
      if (fs.existsSync(path.resolve(cwd, templatName, 'package.json'))) {
        console.error(`A project with the name ${templatName} already exists.`);
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
      await fs.remove(templatePath);

      console.log(`Creating a new ${templateType}.`);
    } catch (error) {
      console.error(error);
    }
  });
