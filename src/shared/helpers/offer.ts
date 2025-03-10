import {CommoditiesEnum, Offer, TypesEnum} from '../types';

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
    author,
    commentsCount,
    coords,
  ] = offerData.replace('\n', '').split('\t');

  const parseCoordinates = (stringCoordinates: string): {longitude: number, latitude: number} => {
    const parsedCoordinates = stringCoordinates.split(';');
    return {
      longitude: parseFloat(parsedCoordinates[1]),
      latitude: parseFloat(parsedCoordinates[0])
    };
  };

  return {
    title,
    description,
    date: new Date(date),
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
