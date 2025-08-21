#!/usr/bin/env node
import { Command } from 'commander';
import { init, initAction } from '@/src/commands/init';

import packageJson from '@/package.json';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const program = new Command()
    .name('bene-mono-cli')
    .description('A CLI to generate monorepo')
    .version(packageJson.version || '1.0.0', '-v, --version', 'the version number')
    .action(initAction);

  program.addCommand(init);
  program.parse(process.argv);
}

main();
