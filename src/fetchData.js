import { sortElements } from './sortElements.js'
/**
 * This function will fetch data from JSON file using fetch api
 * @returns {object} cityDetails
 */
export async function fetchCityDetails () {
  let cityDetails = await fetch('../Assets/HTML&CSS/files/data.json')
    .then((res) => { return res.json() })
    .then((data) => { return data })
  cityDetails = sortElements.sortCityOptions(cityDetails)
  return cityDetails
}
