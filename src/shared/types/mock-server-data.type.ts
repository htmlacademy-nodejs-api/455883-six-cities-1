export type City = {
  name: string,
  coords: {
    latitude: string,
    longitude: string
  }
}

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  photos: string[];
};
