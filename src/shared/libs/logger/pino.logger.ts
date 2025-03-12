import {Logger as PinoInstance, pino, transport} from 'pino';
import { injectable } from 'inversify';
import { resolve } from 'node:path';
import {Logger} from './logger.interface.js';
import {getCurrentModuleDirectoryPath} from '../../helpers/file-system.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created...');
  }

  public debug(message: string, ...args: unknown[]) {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]) {
    this.logger.error(message, ...args);
  }
}
