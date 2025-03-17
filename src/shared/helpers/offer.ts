import {CommoditiesEnum, Offer, TypesEnum, UserTypes} from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    date,
    city,
    previewImage,
    photos,
    isPremium,
    isFavorite,
    rating,
    type,
    roomsCount,
    guestsCount,
    price,
    commodities,
    email,
    name,
    userType,
    avatarPath,
    commentsCount,
    coords,
  ] = offerData.replace('\n', '').split('\t');

  const parseCoordinates = (stringCoordinates: string): {longitude: number, latitude: number} => {
    // const parsedCoordinates = stringCoordinates.split(';');
    console.log(stringCoordinates, 'stringCoordinates');
    return {
      longitude: parseFloat('30'),
      latitude: parseFloat('30')
    };
  };

  const author = {
    email,
    name,
    type: userType as UserTypes,
    avatarPath
  };

  return {
    title,
    description,
    city,
    previewImage,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: parseFloat(rating),
    type: type as TypesEnum,
    roomsCount: parseInt(roomsCount, 10),
    guestsCount: parseInt(guestsCount, 10),
    price: parseInt(price, 10),
    commodities: commodities.split(';') as CommoditiesEnum[],
    author,
    commentsCount: parseInt(commentsCount, 10),
    coords: parseCoordinates(coords)
  };
}
