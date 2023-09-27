/* eslint-env jest */
import { sortElements } from '../../src/sortElements.js'
describe('SortCityOptions', () => {
  test('sort cities which is already sorted', () => {
    expect(sortElements.sortCityOptions({ a: 1, b: 2, d: 8, c: 7 })).toEqual({ a: 1, b: 2, c: 7, d: 8 })
    expect(sortElements.sortCityOptions({ a: 1, b: 2, c: 8, d: 7 })).toEqual({ a: 1, b: 2, c: 8, d: 7 })
    expect(sortElements.sortCityOptions({ b: 1, a: 2 })).toEqual({ a: 2, b: 1 })
    expect(sortElements.sortCityOptions({ d: 1, c: 2, b: 8, a: 7 })).toEqual({ a: 7, b: 8, c: 2, d: 1 })
    expect(sortElements.sortCityOptions({ })).toEqual({})
  })
})

test('sort cities based on weatherType', () => {
  expect(sortElements.sortCitiesBasedOnWeatherType([{ cityName: 'Nome', temperature: '4°C' }, { cityName: 'NewYork', temperature: '23°C' }, { cityName: 'Jamaica', temperature: '29°C' }, { cityName: 'LosAngeles', temperature: '23°C' }], 'temperature')).toEqual([{ cityName: 'Jamaica', temperature: '29°C' }, { cityName: 'NewYork', temperature: '23°C' }, { cityName: 'LosAngeles', temperature: '23°C' }, { cityName: 'Nome', temperature: '4°C' }])
  expect(sortElements.sortCitiesBasedOnWeatherType([{ cityName: 'Nome', precipitation: '47%' }, { cityName: 'NewYork', precipitation: '50%' }, { cityName: 'Jamaica', precipitation: '90%' }, { cityName: 'LosAngeles', precipitation: '46%' }], 'precipitation')).toEqual([{ cityName: 'Jamaica', precipitation: '90%' }, { cityName: 'NewYork', precipitation: '50%' }, { cityName: 'Nome', precipitation: '47%' }, { cityName: 'LosAngeles', precipitation: '46%' }])
  expect(sortElements.sortCitiesBasedOnWeatherType([{ cityName: 'Jamaica', humidity: '80%' }, { cityName: 'LosAngeles', humidity: '90%' }], 'humidity')).toEqual([{ cityName: 'LosAngeles', humidity: '90%' }, { cityName: 'Jamaica', humidity: '80%' }])
})

test('sort cities by continent', () => {
  expect(sortElements.sortCitiesByContinent([{ timeZone: 'America/Los_Angeles' }, { timeZone: 'Africa/Maseru' }, { timeZone: 'Pacific/Auckland' }])).toEqual([{ timeZone: 'Africa/Maseru' }, { timeZone: 'America/Los_Angeles' }, { timeZone: 'Pacific/Auckland' }])
  expect(sortElements.sortCitiesByContinent([{ timeZone: 'Africa/Maseru' }, { timeZone: 'America/Los_Angeles' }, { timeZone: 'Pacific/Auckland' }])).toEqual([{ timeZone: 'Africa/Maseru' }, { timeZone: 'America/Los_Angeles' }, { timeZone: 'Pacific/Auckland' }])
})

// test('sort cities by temperature', () => {
//   expect(sortElements.sortCitiesByTemperature([{ timeZone: 'America/Los_Angeles', temperature: '40c' }, { timeZone: 'Africa/Maseru', temperature: '50c' }, { timeZone: 'Pacific/Auckland', temperature: '20c' }], 'asc')).toEqual([{ timeZone: 'Pacific/Auckland', temperature: '20c' }, { timeZone: 'America/Los_Angeles', temperature: '40c' }, { timeZone: 'Africa/Maseru', temperature: '50c' }])
//   expect(sortElements.sortCitiesByTemperature([{ timeZone: 'Pacific/Auckland', temperature: '20c' }, { timeZone: 'America/Los_Angeles', temperature: '40c' }, { timeZone: 'Africa/Maseru', temperature: '50c' }], 'desc')).toEqual([{ timeZone: 'Africa/Maseru', temperature: '50c' }, { timeZone: 'America/Los_Angeles', temperature: '40c' }, { timeZone: 'Pacific/Auckland', temperature: '20c' }])
// })
