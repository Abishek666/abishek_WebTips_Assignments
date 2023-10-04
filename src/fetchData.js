import { sortElements } from './sortElements.js'
/**
 * This function will fetch data from JSON file using fetch api
 * @returns {object} cityDetails
 */
export async function fetchCityDetails () {
  let cityDetails = await fetch('https://soliton.glitch.me/all-timezone-cities')
    .then((res) => { return res.json() })
    .then((data) => { return data })
  const cityDetailsObject = {}
  cityDetails.map((items) => {
    cityDetailsObject[items.cityName.toLowerCase()] = items
    return 0
  })
  cityDetails = cityDetailsObject
  cityDetails = sortElements.sortCityOptions(cityDetails)
  return cityDetails
}

/**
 *  This function will get the next n hours value
 * @param {string} dateAndTime it is the date and time string
 * @param {string} cityName it is the cityname
 *  @returns {object} next five hours temperature array
 */
export async function fetchNextHours (dateAndTime, cityName) {
  const body = {
    city_Date_Time_Name: dateAndTime + ', ' + cityName, hours: 4
  }
  const request = {
    method: 'POST',
    headers: {

      Accept: 'application/json',

      'Content-Type': 'application/json'

    },
    body: JSON.stringify(body)
  }
  const fetchRes = await fetch('https://soliton.glitch.me/hourly-forecast', request)
    .then(res => res.json())
    .then(d => { return d })
  return fetchRes
}
