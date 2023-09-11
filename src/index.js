import { months } from './data.js'
let setTimerId

(async function () {
  let allCityDetails = await fetchCityDetails()
  const icons = document.querySelectorAll('.mid-ic')
  const leftArrow = document.getElementById('left-scroll-arrow')
  const rightArrow = document.getElementById('right-scroll-arrow')
  let middleSegmentCards = allCityDetails
  let selectedIcon = ' '
  let cardCount = document.getElementById('select-icon').value
  allCityDetails = sortCityOptions(allCityDetails)
  loadSelectOptions(allCityDetails)
  changeHeaderValues()
  selectIcon('sunny-ic')
  document.querySelector('.option-select.city').addEventListener('change', changeHeaderValues)
  icons.forEach((ic) => ic.addEventListener('click', (e) => { selectIcon(e.target.id) }))
  getScrollWidth()
  leftArrow.addEventListener('click', () => { scrollItems('left') })
  rightArrow.addEventListener('click', () => { scrollItems('right') })
  document.getElementById('select-icon').addEventListener('change', getCardCount)

  /**
   * This function will update live time based on cities
   * @param {string} cityTimezone Timezone name
   */
  function updateHeaderTime (cityTimezone) {
    const time = document.getElementsByClassName('time-text')[0]
    console.log(cityTimezone)
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
  function getScrollWidth () {
    const middleContainerWidth = document.getElementsByClassName('items-container')[0].clientWidth
    const scrollContainerWidth = document.getElementsByClassName('items-container')[0].scrollWidth
    if (middleContainerWidth >= scrollContainerWidth) {
      document.getElementsByClassName('left-arr')[0].style.display = 'none'
      document.getElementsByClassName('right-arr')[0].style.display = 'none'
      document.getElementsByClassName('items-container')[0].style.justifyContent = 'space-around'
    } else {
      document.getElementsByClassName('left-arr')[0].style.display = 'block'
      document.getElementsByClassName('right-arr')[0].style.display = 'block'
    }
  }

  /**
   * This function will get the value from spinner  and update the card numbers
   */
  function getCardCount () {
    cardCount = document.getElementById('select-icon').value
    changeMiddleSegment(middleSegmentCards)
    getScrollWidth()
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
    console.log(result)
    return result
  }

  /**
   *
   * @param {object} obj filtered cities object
   * @param {string} key sorting parameter
   */
  function compareFunction (obj, key) {
    console.log(key)
    return Object.values(obj).sort((a, b) => { return parseInt(b[key]) - parseInt(a[key]) })
  }

  /**
   *   This function selects the icon and add style. It calls the filter function
   * @param {string} id Icon id
   */
  function selectIcon (id) {
    console.log(id)
    if (selectedIcon !== ' ') { document.getElementById(selectedIcon).classList.remove('ic-click') }
    selectedIcon = id
    document.getElementById(selectedIcon).classList.add('ic-click')
    filterMiddleSegment(selectedIcon)
  }

  /**
   *  This function will filter the cities based on selected icons
   * @param {string} iconId icon id for identification
   */
  function filterMiddleSegment (iconId) {
    let filterObject = {}
    document.getElementsByClassName('items-container')[0].innerHTML = ' '
    Object.values(allCityDetails).map((data) => {
      const temp = parseInt(data.temperature.slice(0, 2))
      const humid = parseInt(data.humidity.slice(0, -1))
      const precip = parseInt(data.precipitation.slice(0, -1))
      const key = data.cityName.toLowerCase()
      if (iconId === 'sunny-ic' && temp > 29 && humid < 50 && precip >= 50) {
        filterObject[key] = allCityDetails[key]
      } else if (iconId === 'snowflake-ic' && (temp >= 20 && temp <= 28) && humid > 50 && precip < 50) {
        filterObject[key] = allCityDetails[key]
      } else if (iconId === 'rainy-ic' && (temp < 20) && humid >= 50) {
        filterObject[key] = allCityDetails[key]
      }
      return 0
    }

    )

    if (iconId === 'sunny-ic') {
      console.log(iconId)
      filterObject = compareFunction(filterObject, 'temperature')
    } else if (iconId === 'snowflake-ic') { filterObject = compareFunction(filterObject, 'precipitation') } else { filterObject = compareFunction(filterObject, 'humidity') }
    middleSegmentCards = filterObject
    changeMiddleSegment(filterObject)
    getScrollWidth()
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
      // console.log(value.cityName.toLowerCase())
      card.innerHTML = changeCardDetailsTemplate(value)
      middleContainer.appendChild(card)
      document.getElementsByClassName('items-scroll')[i].style.backgroundImage = "url('/Assets/HTML&CSS/Icons_for_cities/" + value.cityName.toLowerCase() + ".svg')"
      i = i + 1
      return 0
    })
    getScrollWidth()
  }

  /**
   * This function is the template for card
   * @param {object} data individual city details
   * @returns {object} card template
   */
  function changeCardDetailsTemplate (data) {
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
   * @param {number} flag to switch between if else
   * @returns {object} top scroll element
   */
  function getCityTimeHtmlTemplate (hour, temperature, flag) {
    if (flag === 0) {
      return (`
      <div class="item-time"> ${hour}</div>
      <div class="pipe">|</div>
      <div class="scroll-icon">
      <img alt="weathericon" class="top-ic"></div>
      <div class='num'> ${temperature} </div>
      `)
    } else {
      return (`
      <div class="item-time"></div>
      <div class="pipe">|</div>
      <div class="scroll-icon">
      </div>
      <div class='num'> </div>
      `)
    }
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
        forecastTimeElement.innerHTML = getCityTimeHtmlTemplate('Now', currentCity.temperature, 0)
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
        forecastTimeElement.innerHTML = getCityTimeHtmlTemplate(hour.toString() + state, currentCity.nextFiveHrs[i - 1], 0)
        topContainer.appendChild(forecastTimeElement)
        changeSelectedCityIcon(currentCity.nextFiveHrs[i - 1], i)
      }

      if (i < 4) {
        const forecastTimeElement = document.createElement('div')
        forecastTimeElement.classList.add('topscroll-items')
        forecastTimeElement.innerHTML = getCityTimeHtmlTemplate('', '', 1)
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
