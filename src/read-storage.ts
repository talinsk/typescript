import { IUserData } from './interface/userdata.js'

export function getUserData () : IUserData {
  const usr: string = localStorage.getItem('user');
  const avatarUrl: string = localStorage.getItem('avatar');
  return {
    userName: usr,
    avatarUrl
  };
}


export function getFavoritesAmount () : number {
  const favam = localStorage.getItem('favoritesAmount');
  const favnum = Number(favam);
  return favnum;
}