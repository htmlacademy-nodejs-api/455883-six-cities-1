import {Command} from './commands.interface';
import {TsvFileReader} from '../shared/utils/tsv-file-reader.js';
import {createOffer, getErrorMessage} from '../shared/helpers/index.js';


export class ImportCommand implements Command {
  public getName(): string {
    return '--help';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public execute(...args: string[]) {
    const [filename] = args;

    const fileReader = new TsvFileReader(filename);

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (e) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(e));
    }
  }
}
