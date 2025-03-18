import {City, MockServerData} from '../types/index.js';

import {
  generateRandomValue,
  getRandomBoolean,
  getRandomCommodities,
  getRandomItem,
  getRandomItems,
  getRandomType
} from '../helpers/index.js';
import {OfferGenerator} from './offer-generator/index.js';
import {Author, COMMENTS_COUNT, Guests, Price, Rating, Rooms} from './constants.js';

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
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

    return [title, description, cityName, preview, photos, isPremium, isFavorite, rating, type, roomCount, guestCount, price,commodities, Author.Email, Author.Name, Author.Type, Author.AvatarPath, COMMENTS_COUNT, coords].join('\t');
  }
}
