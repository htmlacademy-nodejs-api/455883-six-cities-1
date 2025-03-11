import {OfferGenerator} from './offer-generator/offer-generator.interface.js';
import {City, MockServerData} from '../types/index.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomCommodities,
  getRandomItem,
  getRandomItems,
  getRandomType
} from '../helpers/index.js';
import dayjs from 'dayjs';

const COMMENTS_COUNT = 5;
const AUTHOR_LINK = 'https://vk.com/id463035';
const enum Price {
  Min = 100,
  Max = 100000
}
const enum WeekDay {
  First = 1,
  Last = 7
}
const enum Rating {
  Min = 1,
  Max = 5,
  DIGITS_AFTER= 1
}
const enum Rooms {
  Min = 1,
  Max = 8
}
const enum Guests {
  Min = 1,
  Max = 10
}

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs()
      .subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day')
      .toISOString();
    const {name: cityName, coords} = getRandomItem<City>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.photos);
    const photos = getRandomItems<string>(this.mockData.photos);
    const isPremium = getRandomBoolean().toString();
    const isFavorite = getRandomBoolean().toString();
    const rating = generateRandomValue(Rating.Min, Rating.Max, Rating.DIGITS_AFTER);
    const type = getRandomType();
    const roomCount = generateRandomValue(Rooms.Min, Rooms.Max).toString();
    const guestCount = generateRandomValue(Guests.Min, Guests.Max).toString();
    const price = generateRandomValue(Price.Min, Price.Max).toString();
    const commodities = getRandomCommodities();

    return [title, description, createdDate, cityName, preview, photos, isPremium, isFavorite, rating, type, roomCount, guestCount, price,commodities, AUTHOR_LINK, COMMENTS_COUNT, coords].join('\t');
  }
}
