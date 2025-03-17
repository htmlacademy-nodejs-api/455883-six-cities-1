import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {CommoditiesEnum, TypesEnum} from '../../types/index.js';
import {Description, Guests, OFFER_PHOTOS_COUNT, Price, Rating, Rooms, Title} from '../../utils/index.js';
import {UserEntity} from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: Title.Min, maxlength: Title.Max })
  public title: string;

  @prop({ required: true, minlength: Description.Min, maxlength: Description.Max })
  public description: string;

  @prop({ required: true })
  public city: string;

  @prop({ required: true})
  public previewImage: string;

  @prop({ required: true })
  public photos: string[];

  @prop({ required: true})
  public isPremium: boolean;

  @prop({ required: true})
  public isFavorite: boolean;

  @prop({ required: true, min: Rating.Min, max: Rating.Max})
  public rating: number;

  @prop({ required: true, enum: TypesEnum})
  public type: TypesEnum;

  @prop({ required: true, min: Rooms.Min, max: Rooms.Max})
  public roomsCount: number;

  @prop({ required: true, min: Guests.Min, max: Guests.Max})
  public guestsCount: number;

  @prop({ required: true, min: Price.Min, max: Price.Max})
  public price: number;

  @prop({ required: true, type: () => [String], enum: CommoditiesEnum })
  public commodities: CommoditiesEnum[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId: Ref<UserEntity>;

  @prop({ default: 0})
  public commentsCount: number;

  @prop({ required: true})
  public coords: {
    longitude: number;
    latitude: number
  };

  public incrementCommentsCount() {
    this.commentsCount++;
  }

  public decrementCommentsCount() {
    this.commentsCount--;
  }

  public getCommentsCount() {
    return this.commentsCount;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
