import { renderBlock } from './lib.js'
import { Place } from './interface/place.js'
import { getFavoritePlaces } from './read-storage.js'

export function renderSearchStubBlock (): void {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage: string): void {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock (places: Place[]): void {
  const favs = getFavoritePlaces();

  let resPlaces: string = `<div class="search-results-header">
                            <p>Результаты поиска</p>
                            <div class="search-results-filter">
                                <span><i class="icon icon-filter"></i> Сортировать:</span>
                                <select>
                                    <option selected="">Сначала дешёвые</option>
                                    <option selected="">Сначала дорогие</option>
                                    <option>Сначала ближе</option>
                                </select>
                            </div>
                          </div>
                          <ul class="results-list">`;

  for (let p of places) {
    const favorite = favs.findIndex(favPlace => favPlace.id === p.id) >= 0;

    resPlaces += `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites ${favorite ? "active" : ""}" data-place-id="${p.id}"></div>
            <img class="result-img" src="${p.image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${p.name}</p>
              <p class="price">${p.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${p.remoteness} км от вас</div>
            <div class="result-info--descr">${p.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `
  }

  resPlaces += `</ul>`;
  
  renderBlock(
    'search-results-block',
    resPlaces
    /*
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites active"></div>
            <img class="result-img" src="./img/result-1.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>YARD Residence Apart-hotel</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">Комфортный апарт-отель в самом сердце Санкт-Петербрга. К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites"></div>
            <img class="result-img" src="./img/result-2.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>Akyan St.Petersburg</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">Отель Akyan St-Petersburg с бесплатным Wi-Fi на всей территории расположен в историческом здании Санкт-Петербурга.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    `
    */
  )
}
