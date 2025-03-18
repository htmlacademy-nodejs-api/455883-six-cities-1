import {User} from './user.js';

export enum TypesEnum {
  Apartment = 'apartment',
  House = 'house',
  Room ='room',
  Hotel = 'hotel'
}

export enum CommoditiesEnum {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export interface Offer {
  title: string,
  description: string,
  city: string,
  previewImage: string,
  photos: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: TypesEnum,
  roomsCount: number,
  guestsCount: number,
  price: number,
  commodities: CommoditiesEnum[],
  author: User,
  commentsCount: number,
  coords: {
    longitude: number,
    latitude: number
  }
}

