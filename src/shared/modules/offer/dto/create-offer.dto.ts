import {CommoditiesEnum, TypesEnum} from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public city: string;
  public previewImage: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: TypesEnum;
  public roomsCount: number;
  public guestsCount: number;
  public price: number;
  public commodities: CommoditiesEnum[];
  public authorId: string;
  public commentsCount: number;
  public coords: {
    longitude: number;
    latitude: number
  };
}

