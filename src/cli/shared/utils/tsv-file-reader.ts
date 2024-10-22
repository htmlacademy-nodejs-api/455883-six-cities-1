import {FileReader} from './file-reader.interface';
import {readFileSync} from 'node:fs';
import {FacilitiesEnum, Offer, TypesEnum} from '../types/offer.js';

export class TsvFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {
  }

  public read() {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  private parseCoordinates(stringCoordinates: string): {longitude: number, latitude: number} {
    const parsedCoordinates = stringCoordinates.split(';');
    return {
      longitude: parseFloat(parsedCoordinates[1]),
      latitude: parseFloat(parsedCoordinates[0])
    };
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File not readed');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewImage, photos, isPremium, isFavorite, rating, type, roomsCount, guestsCount, price, facilities, author, commentsCount, coords]): Offer => ({
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
        facilities: facilities.split(';') as FacilitiesEnum[],
        author,
        commentsCount: parseInt(commentsCount, 10),
        coords: this.parseCoordinates(coords)
      })
      );
  }
}
