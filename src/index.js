import { months } from './data.js'

(async function () {
  let setTimerId, setTimerIdBottom
  let bottomItemCount = 0
  const bottomContainerElements = document.getElementsByClassName('bottom-itemscontainer')[0]
  let allCityDetails = await fetchCityDetails()
  const weatherList = document.querySelectorAll('.mid-ic')
  const leftArrow = document.getElementById('left-scroll-arrow')
  const rightArrow = document.getElementById('right-scroll-arrow')
  let middleSegmentCards = allCityDetails
  let selectedWeather = ' '
  let cardCount = document.getElementById('select-icon').value
  allCityDetails = sortCityOptions(allCityDetails)
  let continentWiseObject = Object.values(allCityDetails)

  loadSelectOptions(allCityDetails)
  changeHeaderValues()
  selectIcon('sunny-ic')
  document.querySelector('.option-select.city').addEventListener('change', changeHeaderValues)
  weatherList.forEach((ic) => ic.addEventListener('click', (e) => { selectIcon(e.target.id) }))
  sideArrowVisibility()
  leftArrow.addEventListener('click', () => { scrollItems('left') })
  rightArrow.addEventListener('click', () => { scrollItems('right') })
  document.getElementById('select-icon').addEventListener('change', updateMiddleCitiesScrollButtonVisibility)
  changeBottomByContinents('down-arrow')
  changeBottomByTemperature('up-arrow-temp')
  document.querySelector('.continent-arrow').addEventListener('click', (e) => { changeBottomByContinents(e.target.id) })
  document.querySelector('.temperature').addEventListener('click', (e) => { changeBottomByTemperature(e.target.id) })

  /**
   *  This function will update the bottom container elements based on continent sorting criteria
   * @param {string} arrowId It is the arrow id of the arrow image
   */
  function changeBottomByContinents (arrowId) {
    const continentArrow = document.getElementsByClassName('continent-arrow')[0]
    if (arrowId === 'down-arrow') {
      bottomItemCount = 0
      continentArrow.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrowUp' + '.svg'
      continentArrow.id = 'up-arrow'
      clearInterval(setTimerIdBottom)
      bottomContainerElements.innerHTML = ''
      continentWiseObject = sortCitiesByContinent(continentWiseObject)
      changeBottomSegment(continentWiseObject)
    } else {
      bottomItemCount = 0
      continentArrow.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrowDown' + '.svg'
      continentArrow.id = 'down-arrow'
      clearInterval(setTimerIdBottom)
      bottomContainerElements.innerHTML = ''
      continentWiseObject = sortCitiesByContinent(continentWiseObject).reverse()
      changeBottomSegment(continentWiseObject)
    }
  }

  /**
   *  This function will  sort the cities based on continent name
   * @param {object}  cityDetails all city details
   * @returns  {object} sorted cities
   */
  function sortCitiesByContinent (cityDetails) {
    cityDetails.sort((a, b) => {
      return (a.timeZone.split('/')[0]) < (b.timeZone.split('/')[0]) ? -1 : 1
    })
    return cityDetails
  }

  /**
   *   This function will update the bottom container elements based on temperature sorting criteria
   * @param {string} arrowId  It is the arrow id of the arrow image
   */
  function changeBottomByTemperature (arrowId) {
    const citiesTemperature = document.getElementsByClassName('temperature-arrow')[0]
    if (arrowId === 'up-arrow-temp') {
      bottomItemCount = 0
      citiesTemperature.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrowDown' + '.svg'
      citiesTemperature.id = 'down-arrow-temp'
      clearInterval(setTimerIdBottom)
      bottomContainerElements.innerHTML = ''
      continentWiseObject = sortCitiesByTemperature(continentWiseObject, 'desc')
      changeBottomSegment(continentWiseObject)
    } else {
      bottomItemCount = 0
      citiesTemperature.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrowUp' + '.svg'
      citiesTemperature.id = 'up-arrow-temp'
      clearInterval(setTimerIdBottom)
      bottomContainerElements.innerHTML = ''
      continentWiseObject = sortCitiesByTemperature(continentWiseObject, 'asc')
      changeBottomSegment(continentWiseObject)
    }
  }

  /**
   *   This function will  sort the cities based on temperature
   * @param {object} cityDetails all city details
   * @param {string} order order to sort the elements
   * @returns {object}  sorted cities
   */
  function sortCitiesByTemperature (cityDetails, order) {
    cityDetails.sort((a, b) => {
      if ((a.timeZone.split('/')[0]) !== (b.timeZone.split('/')[0])) {
        return 0
      } else {
        if (order === 'asc') { return parseInt(a.temperature) - parseInt(b.temperature) } else {
          return parseInt(b.temperature) - parseInt(a.temperature)
        }
      }
    })
    return cityDetails
  }

  /**
   *   It will add elements to the bottom container
   * @param {object}cities all city details
   */
  function changeBottomSegment (cities) {
    const bottomContainer = document.getElementsByClassName('bottom-itemscontainer')[0]
    cities.map((city) => {
      if (bottomItemCount < 12) {
        const card = document.createElement('div')
        card.classList.add('container-elements')
        card.innerHTML = getContinentWiseDataTemplate(city)
        bottomContainer.appendChild(card)
      }
      return 0
    }
    )
  }

  /**
   * It is the template for bottom element
   * @param {string} city city details
   * @returns {string} bottom element template
   */
  function getContinentWiseDataTemplate (city) {
    const continents = city.timeZone.split('/')[0]
    bottomItemCount = bottomItemCount + 1
    const bottomContainerId = 'live-time-' + bottomItemCount
    return (`<div class="cont">
      ${continents}
  </div>
  <div class="city-time"> ${city.cityName + ', '} &nbsp;<div id= ${bottomContainerId} ${updateBottomTime(city.timeZone, bottomContainerId)}>
  </div></div>
  <div class="bottom-temp"> ${city.temperature}</div>
  <div class="bottom-humidinfo">
      <img alt="humidicon" src="/Assets/HTML&CSS/Weather_Icons/humidityIcon.svg" width="17vw" height="17vh">
      <div>${city.humidity}</div>

  </div>`)
  }

  /**
   * It will update the bottom time
   * @param {string}cityTimezone It is the timezone of the cities
   * @param {string}itemName Id for each elements
   */
  function updateBottomTime (cityTimezone, itemName) {
    const timeoutHandle = setTimeout(() => {
      setTime(cityTimezone, itemName)
      clearInterval(timeoutHandle)
    }, 10)
    setTimerIdBottom = setInterval(() => {
      setTime(cityTimezone, itemName)
    }, 60000)
  }

  /**
   *  It will update the bottom time
   * @param {string} cityTimezone It is the timezone of the cities
   * @param {string}itemName  Id for each elements
   */
  function setTime (cityTimezone, itemName) {
    const timeArray = new Date().toLocaleTimeString('en-US', { timeZone: cityTimezone }).split(' ')
    const hourAndMin = timeArray[0].split(':')
    if (document.getElementById(itemName) !== null) {
      document.getElementById(itemName).innerHTML = ' ' + hourAndMin[0] + ':' + hourAndMin[1] + ' ' + timeArray[1]
    }
  }
  /**
   * This function will update live time based on cities
   * @param {string} cityTimezone Timezone name
   */
  function updateHeaderTime (cityTimezone) {
    const time = document.getElementsByClassName('time-text')[0]
    let timeArray
    setTimerId = setInterval(() => {
      timeArray = new Date().toLocaleTimeString('en-US', { timeZone: cityTimezone }).split(' ')[0]
      timeArray = timeArray.split(':')
      time.innerHTML = timeArray[0] + ':' + timeArray[1] + ':' + '<small>' + timeArray[2] + '<small>'
    }, 1000)
  }

  /**
   *  This function will get the scrollwidth and clientwidth of the itemscontainer to display the arrow
   */
  function sideArrowVisibility () {
    const middleCardContainer = document.getElementsByClassName('items-container')[0]
    const middleContainerWidth = middleCardContainer.clientWidth
    const scrollContainerWidth = middleCardContainer.scrollWidth
    if (middleContainerWidth >= scrollContainerWidth) {
      document.getElementsByClassName('left-arr')[0].style.display = 'none'
      document.getElementsByClassName('right-arr')[0].style.display = 'none'
      document.getElementsByClassName('items-container')[0].style.justifyContent = 'space-around'
    } else {
      document.getElementsByClassName('left-arr')[0].style.display = 'block'
      document.getElementsByClassName('right-arr')[0].style.display = 'block'
      document.getElementsByClassName('items-container')[0].style.justifyContent = 'start'
    }
  }

  /**
   * This function will get the value from spinner  and update the card numbers
   */
  function updateMiddleCitiesScrollButtonVisibility () {
    cardCount = document.getElementById('select-icon').value
    changeMiddleSegment(middleSegmentCards)
    sideArrowVisibility()
  }

  /**
   * This function will scroll the container when arrow is clicked
   * @param {string} arrow It is used to identify the arrow
   */
  function scrollItems (arrow) {
    const cardWidth = document.querySelector('.items-scroll').getBoundingClientRect().width
    const scrollContainer = document.querySelector('.items-container')
    if (arrow === 'right') scrollContainer.scrollLeft += cardWidth
    else scrollContainer.scrollLeft -= cardWidth
  }

  /**
   *  This function sorts the objects
   * @param {object} data  all city details
   *  @returns {object} returns the sorted city objects
   */
  function sortCityOptions (data) {
    const sortedKeys = Object.keys(data).sort()
    const result = { }
    sortedKeys.forEach((key) => { result[key] = data[key] })
    return result
  }

  /**
   * This function will sort the objects based on weather type
   * @param {object} citiesObject filtered cities object
   * @param {string} weatherType sorting parameter
   * @returns {object} sorted cities
   */
  function sortCitiesBasedOnWeatherType (citiesObject, weatherType) {
    return citiesObject.sort((a, b) => { return parseInt(b[weatherType]) - parseInt(a[weatherType]) })
  }

  /**
   *   This function selects the icon and add style. It calls the filter function
   * @param {string} id Icon id
   */
  function selectIcon (id) {
    if (selectedWeather !== ' ') { document.getElementById(selectedWeather).classList.remove('ic-click') }
    selectedWeather = id
    document.getElementById(selectedWeather).classList.add('ic-click')
    filterMiddleSegment(selectedWeather)
  }

  /**
   *
   * @param  {object} cities all city details
   *  @returns {boolean}  filter sunny based on conditions
   */
  function filterSunny (cities) {
    const temp = parseInt(cities.temperature)
    const humid = parseInt(cities.humidity)
    const precip = parseInt(cities.precipitation)
    return temp > 29 && humid < 50 && precip >= 50
  }
  /**
   *
   * @param {object} cities all city details
   *  @returns {boolean}  filter snowflake based on conditions
   */
  function filterSnowFlake (cities) {
    const temp = parseInt(cities.temperature)
    const humid = parseInt(cities.humidity)
    const precip = parseInt(cities.precipitation)
    return (temp >= 20 && temp <= 28) && humid > 50 && precip < 50
  }
  /**
   *
   * @param {object} cities all city details
   * @returns {boolean}  filter rainy based on conditions
   */
  function filterRainy (cities) {
    const temp = parseInt(cities.temperature)
    const humid = parseInt(cities.humidity)
    return (temp < 20) && humid >= 50
  }

  /**
   *  This function will filter the cities based on selected icons and sort them
   * @param {string} iconId icon id for identification
   */
  function filterMiddleSegment (iconId) {
    let filteredObject = {}
    document.getElementsByClassName('items-container')[0].innerHTML = ' '
    if (iconId === 'sunny-ic') {
      filteredObject = Object.values(allCityDetails).filter(filterSunny)
      filteredObject = sortCitiesBasedOnWeatherType(filteredObject, 'temperature')
    } else if (iconId === 'snowflake-ic') {
      filteredObject = Object.values(allCityDetails).filter(filterSnowFlake)
      filteredObject = sortCitiesBasedOnWeatherType(filteredObject, 'precipitation')
    } else if (iconId === 'rainy-ic') {
      filteredObject = Object.values(allCityDetails).filter(filterRainy)
      filteredObject = sortCitiesBasedOnWeatherType(filteredObject, 'humidity')
    }
    middleSegmentCards = filteredObject
    changeMiddleSegment(filteredObject)
    sideArrowVisibility()
  }
  /**
   *    This function generate the card in container iteratively
   * @param {object}cities all city details
   */
  function changeMiddleSegment (cities) {
    const middleContainer = document.getElementsByClassName('items-container')[0]
    middleContainer.innerHTML = ''
    const data = Object.values(cities)
    let i = 0
    data.slice(0, cardCount).map((value) => {
      const card = document.createElement('div')
      card.classList.add('items-scroll')
      card.innerHTML = getCardDetailsTemplate(value)
      middleContainer.appendChild(card)
      document.getElementsByClassName('items-scroll')[i].style.backgroundImage = "url('/Assets/HTML&CSS/Icons_for_cities/" + value.cityName.toLowerCase() + ".svg')"
      i = i + 1
      return 0
    })
    sideArrowVisibility()
  }

  /**
   * This function is the template for card
   * @param {object} data individual city details
   * @returns {object} card template
   */
  function getCardDetailsTemplate (data) {
    const time = data.dateAndTime.split(', ')[0].split('/')
    return (`<div class="items-leftpart">
  <div class="scroll-itemcity">${data.cityName}</div>
  <div class="scroll-itemtime">${data.dateAndTime.split(', ')[1]}</div>
  <div class="scroll-itemdate">${time[0] + '-' + time[1] + '-' + time[2]}</div>
  <div class="scrollitem-humidinfo">
      <img alt="humidityicon" src="/Assets/HTML&CSS/Weather_Icons/humidityIcon.svg">
      <div>${data.humidity}</div>
  </div>
  <div class="scrollitem-precipinfo">
      <img alt="precipicon" src="/Assets/HTML&CSS/Weather_Icons/precipitationIcon.svg">
      <div>${data.precipitation}</div>
  </div>
</div>
<div class="items-rightpart">
  <img alt="sunnyicon" src="/Assets/HTML&CSS/Weather_Icons/sunnyIcon.svg" class="sunny-icon">
  <div>${data.temperature}</div>
</div>
</div>`)
  }

  /**
   * @param {string} hour current hour
   * @param {string} temperature current temperature
   * @returns {object} top scroll element
   */
  function getCityTimeHtmlTemplate (hour, temperature) {
    return (`
      <div class="item-time"> ${hour ?? ''}</div>
      <div class="pipe">|</div>
      <div class="scroll-icon">
      ${(temperature || hour) ? '<img alt="weathericon" class="top-ic"> </div>' : ''}
      <div class='num'> ${temperature ?? ''} </div>
      `)
  }
  /**
   * This function will change the icons for particular hour based on temperature value
   * @param {string} temp current temperature
   * @param {number} i increment value for accessing each classes iteretively
   */
  function changeSelectedCityIcon (temp, i) {
    temp = parseInt(temp.slice(0, 2))
    const iconImage = document.getElementsByClassName('top-ic')[i]
    if (temp >= 23 && temp <= 29) { iconImage.src = '../Assets/HTML&CSS/Weather_Icons/cloudyIcon.svg' } else if (temp < 18) { iconImage.src = '../Assets/HTML&CSS/Weather_Icons/rainyIcon.svg' } else if (temp <= 22 && temp >= 18)iconImage.src = '../Assets/HTML&CSS/Weather_Icons/windyIcon.svg'
    else iconImage.src = '../Assets/HTML&CSS/Weather_Icons/sunnyIcon.svg'
  }
  /**
   *This function will change the top hourly temperature value for next 5 hours
   * @param {object} currentCity This object holds the current city value
   * @param {string} hour current hour of the city
   * @param {string} state current Meridiem state
   */
  function changeTopScroll (currentCity, hour, state) {
    const topContainer = document.getElementsByClassName('top-end')[0]
    topContainer.innerHTML = ''
    for (let i = 0; i < 5; i += 1) {
      if (i === 0) {
        const forecastTimeElement = document.createElement('div')
        forecastTimeElement.classList.add('topscroll-items')
        forecastTimeElement.innerHTML = getCityTimeHtmlTemplate('Now', currentCity.temperature)
        topContainer.appendChild(forecastTimeElement)
        changeSelectedCityIcon(currentCity.temperature, i)
      } else {
        const forecastTimeElement = document.createElement('div')
        forecastTimeElement.classList.add('topscroll-items')
        if (parseInt(hour) === 11) hour = 12
        else hour = (parseInt(hour) + 1) % 12
        if (hour === 1) {
          if (state === 'PM') state = 'AM'
          else state = 'PM'
        }
        forecastTimeElement.innerHTML = getCityTimeHtmlTemplate(hour.toString() + state, currentCity.nextFiveHrs[i - 1])
        topContainer.appendChild(forecastTimeElement)
        changeSelectedCityIcon(currentCity.nextFiveHrs[i - 1], i)
      }

      if (i < 4) {
        const forecastTimeElement = document.createElement('div')
        forecastTimeElement.classList.add('topscroll-items')
        forecastTimeElement.innerHTML = getCityTimeHtmlTemplate('', '')
        topContainer.appendChild(forecastTimeElement)
      }
    }
  }

  /**
   *This function will change values if the option is changed in city selection
   */
  function changeHeaderValues () {
    clearInterval(setTimerId)
    const selectedCity = document.getElementsByClassName('option-select')[0].value.toLowerCase()
    const cityDetails = allCityDetails[selectedCity]
    const time = document.getElementsByClassName('time-text')[0]
    const date = document.getElementById('date-text')
    const timeState = document.getElementById('time-img')
    const timeJson = cityDetails.dateAndTime
    const separatedArray = timeJson.split(', ')
    const splitDate = separatedArray[0].split('/')
    document.getElementById('top-img').src = '../Assets/HTML&CSS/Icons_for_cities/' + selectedCity + '.svg'
    document.getElementById('tempc-val').innerHTML = cityDetails.temperature
    document.getElementById('tempf-val').innerHTML = ((parseInt(cityDetails.temperature) * 9 / 5) + 32).toFixed(2) + 'F'
    document.getElementById('humid-val').innerHTML = cityDetails.humidity
    document.getElementById('precip-val').innerHTML = cityDetails.precipitation
    date.innerHTML = splitDate[1] + '-' + months[parseInt(splitDate[0]) - 1] + '-' + splitDate[2]
    const splitTime = separatedArray[1].split(':')
    const splitSecAndMeridiem = splitTime[2].split(' ')
    updateHeaderTime(cityDetails.timeZone)
    if (splitSecAndMeridiem[1] === 'PM') {
      timeState.src = '../Assets/HTML&CSS/GeneralImages&Icons/pmState.svg'
      time.classList.add('pm-state')
    } else {
      timeState.src = '../Assets/HTML&CSS/GeneralImages&Icons/amState.svg'
      time.classList.add('time-text')
      time.classList.remove('pm-state')
    }
    changeTopScroll(cityDetails, splitTime[0], splitSecAndMeridiem[1])
  }

  /**
   * This function will load the the city names in option of datalist
   * @param {object} data all city data JSON file
   */
  function loadSelectOptions (data) {
    data = Object.values(data)
    const dataList = document.querySelector('.datalist-options')
    data.map((s) => {
      const options = document.createElement('option')
      options.value = s.cityName
      dataList.appendChild(options)
      return 0
    })
  }

  /**
   * This function will fetch data from JSON file using fetch api
   * @returns {object} cityDetails
   */
  async function fetchCityDetails () {
    const cityDetails = await fetch('../Assets/HTML&CSS/files/data.json')
      .then((res) => { return res.json() })
      .then((data) => { return data })
    return cityDetails
  }
})()
