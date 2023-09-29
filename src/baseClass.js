import { topSection } from './topSection.js'
import { domElement } from './domElements.js'

/**
 *
 * @param {object} cityDetails  individual city details
 * this is the function for setting values of the object
 */
class topSectionProto {
  constructor (cityDetails) {
    this.cityName = cityDetails.cityName.toLowerCase()
    this.temperature = cityDetails.temperature
    this.humidity = cityDetails.humidity
    this.precipitation = cityDetails.precipitation
    this.timeZone = cityDetails.timeZone
    this.dateAndTime = cityDetails.dateAndTime
    this.nextFiveHrs = cityDetails.nextFiveHrs
  }

  updateTopMiddle () {
    topSection.updateTopMiddle(this.cityName, this.temperature, this.humidity, this.precipitation)
  }

  setTopDate () {
    topSection.setTopTime(this.timeZone, this.temperature, this.nextFiveHrs)
  }

  setTopTime () {
    topSection.setTopTime(this.timeZone, this.temperature, this.nextFiveHrs)
  }
}
/**
 *This function will change values if the option is changed in city selection
 * @param {string}cityName city name of the selected city
 */
export const changeHeaderValues = (cityName) => {
  clearInterval(domElement.setTimerId)
  const selectedCity = cityName.toLowerCase()
  const cityDetails = domElement.allCityDetails[selectedCity]
  const city = new topSectionProto(cityDetails)
  city.updateTopMiddle()
  city.setTopDate()
  city.setTopTime()
}
