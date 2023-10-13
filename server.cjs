const express = require('express')
const path = require('path')
const { fork } = require('child_process')

const app = express()

let allCityData = ''

app.use(express.static(path.join(__dirname, '/src')))
app.use(express.static(__dirname))
app.use(express.json())
app.get('/all-city-timezones', function (req, res) {
  const childProcess = fork('./childThread.cjs')
  childProcess.send(['all-city-timezones'])
  childProcess.on('message', (msg) => {
    allCityData = msg
    res.json(msg)
  })
})

app.post('/get-hourly-details', function (req, res) {
  const childProcess = fork('./childThread.cjs')
  childProcess.send(['get-hourly-details', req.body, allCityData])
  childProcess.on('message', (msg) => {
    res.json(msg)
  })
})

app.listen(5000, () => console.log('app running in http://localhost:5000/'))
