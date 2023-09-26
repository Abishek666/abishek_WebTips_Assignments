import { topSection } from './topSection.js'
import { domElement } from './domElements.js'

/**
 *
 * @param cityDetails
 */
function topSectionProto (cityDetails) {
  this.cityDetails = cityDetails
  this.cityName = cityDetails.cityName.toLowerCase()
  this.temperature = cityDetails.temperature
  this.humidity = cityDetails.humidity
  this.precipitation = cityDetails.precipitation
  this.timeZone = cityDetails.timeZone
  this.dateAndTime = cityDetails.dateAndTime
  this.nextFiveHrs = cityDetails.nextFiveHrs
}

topSectionProto.prototype.updateTopMiddle = function () {
  topSection.updateTopMiddle(this.cityName, this.temperature, this.humidity, this.precipitation)
}

topSectionProto.prototype.setTopDate = function () {
  topSection.setTopDate(this.dateAndTime)
}

topSectionProto.prototype.setTopTime = function () {
  topSection.setTopTime(this.timeZone, this.temperature, this.nextFiveHrs)
}

/**
 *This function will change values if the option is changed in city selection
 * @param allCityDetails
 */
export const changeHeaderValues = () => {
  clearInterval(domElement.setTimerId)
  const selectedCity = document.getElementsByClassName('option-select')[0].value.toLowerCase()
  const cityDetails = domElement.allCityDetails[selectedCity]
  const city = new topSectionProto(cityDetails)
  city.updateTopMiddle()
  city.setTopDate()
  city.setTopTime()
}
