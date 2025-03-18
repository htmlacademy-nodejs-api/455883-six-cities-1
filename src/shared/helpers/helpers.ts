import {CommoditiesEnum, TypesEnum} from '../types/index.js';


export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}
export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}
export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}
export function getRandomBoolean(): boolean{
  return [true, false][generateRandomValue(0,1)];
}
export function getRandomType(): TypesEnum{
  return [TypesEnum.Hotel, TypesEnum.Room, TypesEnum.House, TypesEnum.Apartment][generateRandomValue(0,3)];
}
export function getRandomCommodities(): CommoditiesEnum{
  return [CommoditiesEnum.BabySeat, CommoditiesEnum.AirConditioning, CommoditiesEnum.Fridge, CommoditiesEnum.Towels, CommoditiesEnum.Washer, CommoditiesEnum.Breakfast, CommoditiesEnum.LaptopFriendlyWorkspace][generateRandomValue(0,6)];
}
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
