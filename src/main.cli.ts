#!/usr/bin/env node
import {Command} from 'commander';
import {HelpCommand} from './cli/commands/help.command.js';
import {VersionCommand} from './cli/commands/version.command.js';
import {ImportCommand} from './cli/commands/import.command.js';

const bootstrap = () => {
  const program = new Command();

  program
    .description('Six Cities CLI')
    .option('-h, --help', 'Show list of commands')
    .option('-v, --version', 'Show app version')
    .option('-i, --import <value>', 'Import data from .tsv')
    .option('-g, --generate <n> <value> <url>', 'Generate N test data')
    .parse(process.argv);

  const options = program.opts();

  if(options.help || Object.keys(options).length === 0) {
    const command = new HelpCommand();
    command.execute();
  }

  if(options.version) {
    const command = new VersionCommand();
    command.execute();
  }

  if(options.import) {
    const command = new ImportCommand();
    command.execute(options.import);
  }

};

bootstrap();
