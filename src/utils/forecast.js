request = require('request');
const forecast = (latitutde,longitude,callback)=>{
  url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitutde+'&lon='+longitude+'&appid=e05adeebc0fc3b89f95d8e8a1c39f0df'
  request({url:url, json: true}, function (error, response, body) {
    if (error) throw new Error(error);
    callback(undefined, body)
  });
}

module.exports = forecast;
