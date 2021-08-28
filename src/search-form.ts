import { renderBlock } from './lib.js'
import { ISearchFormData } from './interface/searchformdata.js'
import { getPlaces } from './apiFunctions.js'
import { Place } from './interface/place.js'
import { renderSearchResultsBlock, renderEmptyOrErrorSearchBlock } from './search-results.js'
import { getFavoritePlaces, saveFavoritePlaces } from './read-storage.js'
import { renderUserBlockFromStorage } from './user.js'
import { Flat, FlatRentSdk } from './flatrent-sdk/flat-rent-sdk.js'

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

    const promises: Promise<void | Place[]>[] = [];

    if (homy.checked) {
      const promHomy = search(searchData);
      promises.push(promHomy);
    }

    if (flatrent.checked) {
      const promFlat = searchFlatRent(searchData)
                    .then(flats => flats.map(f => _flatToPlace(f)))
                    .catch(e => console.log(e));

      promises.push(promFlat);
    }

    if (promises.length === 0) {
      return;
    }

    let places: Place[] = [];
    Promise.all(promises.map(p => p.catch(e => <Place[]>[])))
           .then(pls => {
              pls.forEach(p => {  
               if (p) {
                places = places.concat(p);
               }
             });

             renderPlaces(places);
            })
  });
}

function search(f: ISearchFormData) : Promise<Place[] | void> {
  return getPlaces(new Date(f.checkInDate), new Date(f.checkOutDate), f.maxPrice, f.coordinates);
}

function _flatToPlace(flat: Flat) : Place {
  return {
    id: flat.id,
    name: flat.title,
    description: flat.details,
    image: flat.photos[0],
    price: flat.totalPrice,
    remoteness: 0
  };
}

async function searchFlatRent(f: ISearchFormData) : Promise<Flat[]> {
  const sdk = new FlatRentSdk();

  return sdk.search({
    city: f.city,
    checkInDate: new Date(f.checkInDate),
    checkOutDate: new Date(f.checkOutDate),
    priceLimit: f.maxPrice || null
  });
}

function renderPlaces(places: Place[]) {
  
  if (places.length === 0) {
    renderEmptyOrErrorSearchBlock('No results');
  }
  else {  
    renderSearchResultsBlock(places);
  }
  
  setFavoriteHandlers(places);
}

function setFavoriteHandlers(places: Place[]) {
  var els = document.getElementsByClassName("favorites");
  for (let btn of els) {
    btn.addEventListener( "click" , () => {
      const id = +btn.getAttribute("data-place-id");
      
      const place = places.find(p => p.id === id);

      toggleFavoritePlace(place);
      renderPlaces(places);
    });
  }
  
}

function toggleFavoritePlace(place: Place) {
  const favs = getFavoritePlaces();
  const index = favs.findIndex(f => f.id === place.id);
  if (index >= 0) {
    favs.splice(index, 1);
  }
  else {
    favs.push({
      id: place.id,
      name: place.name,
      image: place.image
    });
  }

  saveFavoritePlaces(favs);
  renderUserBlockFromStorage();
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
