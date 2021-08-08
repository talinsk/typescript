import { renderBlock } from './lib.js'
import { ISearchFormData } from './interface/searchformdata.js'

export function renderSearchFormBlock (dateStart: Date, dateEnd: Date): void {

  dateStart.setDate(dateStart.getDate() + 1);
  dateEnd.setDate(dateEnd.getDate() + 3);
  const curd = new Date();

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input id="hidden" type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input id="homy" type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input id="flat-rent" type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${formatDate(dateStart)}" min="${formatDate(curd)}" max="${formatDate(getLastDayOfMonth(curd))}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${formatDate(dateEnd)}" min="${formatDate(curd)}" max="${formatDate(getLastDayOfMonth(curd))}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="search" type="button">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}

export function addFormHandlers() {
  const elem = document.getElementById('search')
  elem.addEventListener( "click" , () => {
    const city = <HTMLInputElement>document.getElementById('city')
    const hidden = <HTMLInputElement>document.getElementById('hidden')
    const homy = <HTMLInputElement>document.getElementById('homy')
    const flatrent = <HTMLInputElement>document.getElementById('flat-rent')
    const checkindate = <HTMLInputElement>document.getElementById('check-in-date')
    const checkoutdate = <HTMLInputElement>document.getElementById('check-out-date')
    const maxprice = <HTMLInputElement>document.getElementById('max-price')

    const searchData: ISearchFormData = {
      city: city.value,
      coordinates: hidden.value,
      homy: homy.checked,
      flatRent: flatrent.checked,
      checkInDate: checkindate.value,
      checkOutDate: checkoutdate.value,
      maxPrice: Number(maxprice.value)
    }

    search(searchData)
  });
}

function search(f: ISearchFormData) {
  console.log(f);
}

function formatDate(d: Date) {

  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
}

function getLastDayOfMonth(d: Date) {
  const month = d.getMonth();
  const year = d.getFullYear();
  const date = new Date(year, month + 2, 0);
  return date;
}
