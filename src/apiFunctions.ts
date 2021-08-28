import { Place } from './interface/place.js'


const API_URL: string = "http://localhost:3030/";

export function getPlaces(checkInDate: Date, checkOutDate: Date, maxPrice: number, coordinates: string) {
  let url = `${API_URL}places/?coordinates=${coordinates}&checkInDate=${dateToUnixStamp(checkInDate)}&checkOutDate=${dateToUnixStamp(checkOutDate)}`;

  if (maxPrice) {
    url += `&maxPrice=${maxPrice}`
  }
  
  return fetch(url)
    .then((response) => {
      return response.text();
    })
    .then<Place[]>((response) => {
      return JSON.parse(response)
    })
    .catch(ctch => {
      console.log('Error:', ctch);
    });
}


function dateToUnixStamp(date) {
  return date.getTime() / 1000
}