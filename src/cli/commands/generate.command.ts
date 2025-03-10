import got from 'got';
import {Command} from './commands.interface';
import {MockServerData} from '../../shared/types';
import {TsvOfferGenerator} from '../../shared/utils/tsv-offer-generator.js';
import {TSVFileWriter} from '../../shared/utils/tsv-file-writer.js';
import {getErrorMessage} from '../../shared/helpers/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;
  private async load(url: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  public getName(): string {
    return '--generate';
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...args: string[]): Promise<void> {
    const [count, filepath, url] = args;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
