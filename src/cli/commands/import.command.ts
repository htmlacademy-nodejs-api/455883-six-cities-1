import {Command} from './commands.interface';
import {TsvFileReader} from '../../shared/utils/tsv-file-reader.js';
import {createOffer, getErrorMessage, getMongoURI} from '../../shared/helpers/index.js';
import {UserService} from '../../shared/modules/user/user-service.interface.js';
import {DefaultOfferService, OfferModel, OfferService} from '../../shared/modules/offer/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../../shared/libs/database-client/index.js';
import {ConsoleLogger, Logger} from '../../shared/libs/logger/index.js';
import {DefaultUserService, UserModel} from '../../shared/modules/user/index.js';
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from './command.constant.js';
import {Offer} from '../../shared/types/index.js';


export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      authorId: user.id
    });
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

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
