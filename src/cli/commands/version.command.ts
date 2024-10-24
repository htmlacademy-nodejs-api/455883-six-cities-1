import {Command} from './commands.interface';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

type PackageJSONConfig = {
  version: string;
}
function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = '../package.json'
  ) {}

  public getName(): string {
    return '--version';
  }

  public async execute(..._args: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (e) {
      console.error(e);
    }
  }

  private readVersion(): string {
    const json = readFileSync(resolve(this.filePath), 'utf-8');
    const parsedJson: unknown = JSON.parse(json);

    if (! isPackageJSONConfig(parsedJson)) {
      throw new Error('Failed to parse json content.');
    }

    return parsedJson.version;
  }
}
