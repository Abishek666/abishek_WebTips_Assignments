const express = require('express')
const path = require('path')
const timezone = require('./src/timeZone.cjs')

const app = express()

let allCityData = ''

app.use(express.static(path.join(__dirname, '/src')))
app.use(express.static(__dirname))
app.use(express.json())
app.get('/all-city-timezones', function (req, res) {
  allCityData = timezone.allTimeZones()
  res.json(allCityData)
})

app.post('/get-hourly-details', function (req, res) {
  const postData = req.body
  const citydn = postData.city_Date_Time_Name
  const hours = postData.hours
  const data = timezone.nextNhoursWeather(citydn, hours, allCityData)
  res.json(data)
})

app.listen(5000, () => console.log('app running in http://localhost:5000/'))
