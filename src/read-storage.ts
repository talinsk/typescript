import { IUserData } from './interface/userdata.js'

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
  const favam = localStorage.getItem('favoritesAmount');
  const favnum = Number(favam);
  if (isNaN(favnum) || isFinite(favnum)) {
    return 0;
  }
  return favnum;
}