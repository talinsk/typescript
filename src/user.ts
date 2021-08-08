import { renderBlock } from './lib.js'
import { getUserData, getFavoritesAmount } from './read-storage.js'


export function renderUserBlockFromStorage() {
  const userData = getUserData();
  const favAmount = getFavoritesAmount();
  if (userData != null) {
    renderUserBlock(userData.userName, userData.avatarUrl, favAmount);
  }
}


export function renderUserBlock (nameUser: string, linkAvatar: string, favoriteItemsAmount: number): void {
  const favoritesCaption = favoriteItemsAmount > 0 ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount > 0 ? true : false

  renderBlock(
    'user-block',

    `
    <div class="header-container">
      <img class="avatar" src="${linkAvatar}" alt="${nameUser}" />
      <div class="info">
          <p class="name">${nameUser}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
