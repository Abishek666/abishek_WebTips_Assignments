const timezone = require('abi-timezones-npm-packages')

process.on('message', (msg) => {
  if (msg[0] === 'all-city-timezones') {
    const allCityData = timezone.allTimeZones()
    process.send(allCityData)
  } else if (msg[0] === 'get-hourly-details') {
    const postData = msg[1]
    const citydn = postData.city_Date_Time_Name
    const hours = postData.hours
    const data = timezone.nextNhoursWeather(citydn, hours, msg[2])
    process.send(data)
  }
})
