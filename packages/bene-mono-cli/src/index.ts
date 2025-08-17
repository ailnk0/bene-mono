import { Command } from 'commander';
import { init } from './commands/init';
import packageJson from '../package.json';

async function main() {
  const program = new Command()
    .name('bene-mono')
    .description('A CLI to generate monorepo')
    .version(packageJson.version || '1.0.0', '-v, --version', 'the version number');

  program.addCommand(init);
  program.parse(process.argv);
}

main();
