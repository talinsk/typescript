import { renderSearchFormBlock, addFormHandlers } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlockFromStorage } from './user.js'
import { renderToast } from './lib.js'


window.addEventListener('DOMContentLoaded', () => {
  renderUserBlockFromStorage();
  renderSearchFormBlock(new Date(), new Date());
  renderSearchStubBlock();
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  );
  addFormHandlers();
})
