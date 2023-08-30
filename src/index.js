let allCityDetails
/**
 *
 */
async function pageStart () {
  allCityDetails = await fetchdata()
  selectOption(allCityDetails)
  document.getElementsByClassName('datalist-options')[0].addEventListener('change', changeValues)
}

/**
 *
 * @param datas
 */

function changeValues () {
  const selectedCity = document.getElementsByClassName('option-select')[0].value.toLowerCase()
  console.log(selectedCity)
  document.getElementById('top-img').src = '../Assets/HTML&CSS/Icons_for_cities/' + selectedCity + '.svg'
  console.log(allCityDetails[selectedCity].temperature)
  document.getElementById('tempc-val').innerHTML = allCityDetails[selectedCity].temperature
  document.getElementById('tempf-val').innerHTML = ((parseInt(allCityDetails[selectedCity].temperature) * 9 / 5) + 32).toFixed(2) + 'F'
  document.getElementById('humid-val').innerHTML = allCityDetails[selectedCity].humidity
  document.getElementById('precip-val').innerHTML = allCityDetails[selectedCity].precipitation
  const time = document.getElementsByClassName('time-text')[0]
  let date = document.getElementById('date-text')
  const timeJson = allCityDetails[selectedCity].dateAndTime
  console.log(timeJson)
  const separatedArray = timeJson.split(', ')
  console.log(separatedArray)
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const splitDate = separatedArray[0].split('/')
  console.log(splitDate)
  date.innerHTML = splitDate[1] + '-' + months[parseInt(splitDate[0]) - 1] + '-' + splitDate[2]
  console.log(date)
  const splitTime = separatedArray[1].split(':')
  console.log(splitTime)
  const splitSecAndMeridiem = splitTime[2].split(' ')
  time.innerHTML = splitTime[0] + ':' + splitTime[1] + ':' + '<small>' + splitSecAndMeridiem[0] + '<small>'
  const timeState = document.getElementById('time-img')
  if (splitSecAndMeridiem[1] === 'PM')
  {
    timeState.src = '../Assets/HTML&CSS/GeneralImages&Icons/pmState.svg'
    time.classList.remove('time-text')
    time.classList.add('pm-state')
}
  else
  {
    timeState.src = '../Assets/HTML&CSS/GeneralImages&Icons/amState.svg'
    time.classList.add('time-text')
    time.classList.remove('pm-state')
  }
}
/**
 *
 * @param data
 */
function selectOption (data) {
  console.log(data)
  data = Object.values(data)
  const dataList = document.querySelector('.datalist-options')
  console.log(data)
  data.map((s) => {
    const options = document.createElement('option')
    options.value = s.cityName
    dataList.appendChild(options)
    return 0
  })

  // document.getElementsByClassName(option-select)
}

/**
 *
 */
async function fetchdata () {
  const cityDetails = await fetch('../Assets/HTML&CSS/files/data.json')
    .then((res) => { return res.json() })
    .then((data) => { return data })
  return cityDetails
}

window.addEventListener('load', pageStart)
