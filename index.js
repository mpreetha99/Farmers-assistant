let request = require('request');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
let apiKey = '6bda9c040fdbca6f7df39a1622a7fb9d';
let city = 'mumbai';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/', function (req, res) {
  console.log(req.body.crop);
  res.render('index');  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

request(url, function (err, response, body) {

  if(err){
    console.log('error:', err);
  } else {
    let weather = JSON.parse(body)
    let message = ` ${weather.coord.lon}  ${weather.coord.lat}  ${weather.main.temp}  ${weather.main.humidity} ${weather.main.pressure} !`;
   console.log(message);
  }
});