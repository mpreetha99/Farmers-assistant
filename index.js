let request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
let rice = require('./rice.json');
let wheat = require('./wheat.json');
let jowar = require('./jowar.json');
const app = express();
let apiKey = '6bda9c040fdbca6f7df39a1622a7fb9d';
var lati;
var long;
var weather;
var message;
var w,t,h,p,r,z,ph;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/', function (req, res) {
  
  console.log(req.body.crop);
  r=req.body.crop; 
  console.log(req.body.latitude)
  lati=req.body.latitude;
  long=req.body.longitude;
  console.log(req.body.longitude)
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=${apiKey}`
  
  request(url, function (err, response, body) {

    if(err){
      console.log('error:', err);
    } else {
      weather = JSON.parse(body)
      message = ` ${weather.name}   ${weather.main.temp}  ${weather.main.humidity} ${weather.main.pressure} `;
      w=weather.name;
      t=weather.main.temp;
      h=weather.main.humidity;
      p=weather.main.pressure;
      ph=6.9;
     console.log(message);
     if(r=='rice')
     {
      m = ` Location ${weather.name}    ${rice.p4.n} `;
     res.render('index', {weather:m , error: null});
     }
     if(r=='wheat')
     {
      m = ` Location ${weather.name}    ${wheat.p1.n} `;
     res.render('index', {weather:m , error: null});
     }
     if(r=='jowar')
     {
      m = ` Location ${weather.name}    ${jowar.p1.n} `;
     res.render('index', {weather:m , error: null});
     }
    }
  })
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

