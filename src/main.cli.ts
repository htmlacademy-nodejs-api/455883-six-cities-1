#!/usr/bin/env node
import 'reflect-metadata';
import {Command} from 'commander';
import {HelpCommand} from './cli/commands/help.command.js';
import {VersionCommand} from './cli/commands/version.command.js';
import {ImportCommand} from './cli/commands/import.command.js';
import {GenerateCommand} from './cli/commands/generate.command.js';

const bootstrap = () => {
  const program = new Command();

  program
    .description('Six Cities CLI')
    .option('-h, --help', 'Show list of commands')
    .option('-v, --version', 'Show app version')
    .option('-i, --import <args...>', 'Import data from .tsv')
    .option('-g, --generate <args...>', 'Generate N test data <n>, <path>, <url>',)
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
    console.log(options.import, 'test');
    const [filename, login, password, host, dbname, salt] = options.import;
    command.execute(filename, login, password, host, dbname, salt);
  }

  if(options.generate) {
    const command = new GenerateCommand();
    command.execute(...options.generate);
  }

};

bootstrap();
