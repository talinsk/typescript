import { IUserData } from './interface/userdata.js'
import { Place } from './interface/place.js'

export function getUserData () : IUserData {
  const usr: string = localStorage.getItem('user');
  const avatarUrl: string = localStorage.getItem('avatar');

  if (usr === null || avatarUrl === null) {
    return null;
  }

  return {
    userName: usr,
    avatarUrl
  };
}


export function getFavoritesAmount () : number {
  const favs = getFavoritePlaces();
  return favs.length;
}

export function saveFavoritePlaces(places: Partial<Place>[]) {
  const favs = JSON.stringify(places);
  localStorage.setItem('favoriteItems', favs);
}

export function getFavoritePlaces(): Partial<Place>[]  {
  const favs = localStorage.getItem('favoriteItems');
  if (!favs) {
    return [];
  }

  return JSON.parse(favs);
}