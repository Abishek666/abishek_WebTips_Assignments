import { months } from './data.js';

(async function () {
  const allCityDetails = await fetchdata()
  loadOptions(allCityDetails)
  changeHeaderValues()
  document.querySelector('.option-select.city').addEventListener('change', changeHeaderValues)
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
        const element = document.createElement('div')
        element.classList.add('topscroll-items')
        element.innerHTML = getCityTimeHtmlTemplate('Now', currentCity.temperature, 0)
        topContainer.appendChild(element)
        changeSelectedCityIcon(currentCity.temperature, i)
      } else {
        const element = document.createElement('div')
        element.classList.add('topscroll-items')
        if (parseInt(hour) === 11) hour = 12
        else hour = (parseInt(hour) + 1) % 12
        if (hour === 1) {
          if (state === 'PM') state = 'AM'
          else state = 'PM'
        }
        element.innerHTML = getCityTimeHtmlTemplate(hour.toString() + state, currentCity.nextFiveHrs[i - 1], 0)
        topContainer.appendChild(element)
        changeSelectedCityIcon(currentCity.nextFiveHrs[i - 1], i)
      }

      if (i < 4) {
        const element = document.createElement('div')
        element.classList.add('topscroll-items')
        element.innerHTML = getCityTimeHtmlTemplate('', '', 1)
        topContainer.appendChild(element)
      }
    }
  }

  /**
   *This function will change values if the option is changed in city selection
   */
  function changeHeaderValues () {
    const selectedCity = document.getElementsByClassName('option-select')[0].value.toLowerCase()
    document.getElementById('top-img').src = '../Assets/HTML&CSS/Icons_for_cities/' + selectedCity + '.svg'
    const cityDetails = allCityDetails[selectedCity]
    document.getElementById('tempc-val').innerHTML = cityDetails.temperature
    document.getElementById('tempf-val').innerHTML = ((parseInt(cityDetails.temperature) * 9 / 5) + 32).toFixed(2) + 'F'
    document.getElementById('humid-val').innerHTML = cityDetails.humidity
    document.getElementById('precip-val').innerHTML = cityDetails.precipitation
    const time = document.getElementsByClassName('time-text')[0]
    const date = document.getElementById('date-text')
    const timeJson = cityDetails.dateAndTime
    const separatedArray = timeJson.split(', ')
    const splitDate = separatedArray[0].split('/')
    date.innerHTML = splitDate[1] + '-' + months[parseInt(splitDate[0]) - 1] + '-' + splitDate[2]
    const splitTime = separatedArray[1].split(':')
    const splitSecAndMeridiem = splitTime[2].split(' ')
    time.innerHTML = splitTime[0] + ':' + splitTime[1] + ':' + '<small>' + splitSecAndMeridiem[0] + '<small>'
    const timeState = document.getElementById('time-img')
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
  function loadOptions (data) {
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
  async function fetchdata () {
    const cityDetails = await fetch('../Assets/HTML&CSS/files/data.json')
      .then((res) => { return res.json() })
      .then((data) => { return data })
    return cityDetails
  }
})()
