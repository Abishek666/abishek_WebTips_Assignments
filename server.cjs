const http = require('http')
const path = require('path')
const fs = require('fs')
const timezone = require('./src/timeZone.cjs')
let allCityData = ''
http.createServer(function (req, res) {
  const reqUrl = req.url
  let contentType = 'text/html'
  let filePath = '.' + reqUrl
  if (filePath === './') {
    filePath = './src/index.html'
  }
  const extName = path.extname(filePath)
  switch (extName) {
    case '.css':
      filePath = './src' + reqUrl
      contentType = 'text/css'
      break
    case '.js':
      filePath = './src' + reqUrl
      contentType = 'text/javascript'
      break
    case '.svg':
      contentType = 'image/svg+xml'
      break
    case '.ico' :
      filePath = '/Assets/HTML&CSS/Weather_Icons/cloudyIcon.svg'
      contentType = 'image/svg+xml'
      break
    case '.png':
  }
  if (req.url === '/all-city-timezones') {
    allCityData = timezone.allTimeZones()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(allCityData))
  }

  if (req.url === '/get-hourly-details' && req.method === 'POST') {
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk
      postData = JSON.parse(postData)
    })
    req.on('end', () => {
      const citydn = postData.city_Date_Time_Name
      const hours = postData.hours
      const data = timezone.nextNhoursWeather(citydn, hours, allCityData)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(data))
    })
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.statusCode = 500
      res.end()
    } else {
      res.setHeader('Content-Type', contentType)
      res.statusCode = 200
      res.end(data)
    }
  })
}).listen(4000)
