import { renderSearchFormBlock, addFormHandlers } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { getUserData, getFavoritesAmount } from './read-storage.js'
import { renderToast } from './lib.js'


window.addEventListener('DOMContentLoaded', () => {
  const userData = getUserData();
  const favAmount = getFavoritesAmount();
  if (userData != null) {
    renderUserBlock(userData.userName, userData.avatarUrl, favAmount);
  }
  renderSearchFormBlock(new Date(), new Date());
  renderSearchStubBlock();
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  );
  addFormHandlers();
})
