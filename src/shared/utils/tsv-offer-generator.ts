import {OfferGenerator} from './offer-generator/offer-generator.interface';
import {City, MockServerData} from '../types';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomCommodities,
  getRandomItem,
  getRandomItems,
  getRandomType
} from '../helpers';
import dayjs from 'dayjs';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const MIN_RATING = 1;
const MAX_RATING = 5;
const RATING_DIGITS_AFTER = 1;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;


export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const {name: cityName, coords} = getRandomItem<City>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.photos);
    const photos = getRandomItems<string>(this.mockData.photos);
    const isPremium = getRandomBoolean().toString();
    const isFavorite = getRandomBoolean().toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_DIGITS_AFTER);
    const type = getRandomType();
    const roomCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guestCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const author = 'https://vk.com/id463035';
    const commodities = getRandomCommodities();
    const commentCount = 5;

    return [title, description, createdDate, cityName, preview, photos, isPremium, isFavorite, rating, type, roomCount, guestCount, price,commodities, author, commentCount, coords].join('\t');
  }
}
