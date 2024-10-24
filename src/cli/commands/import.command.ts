import {Command} from './commands.interface';
import {TsvFileReader} from '../shared/utils/tsv-file-reader.js';


export class ImportCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(...args: string[]) {
    const [filename] = args;

    const fileReader = new TsvFileReader(filename);

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }
      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${e.message}`);
    }
  }
}
