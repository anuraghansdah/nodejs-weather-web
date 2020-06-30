const request = require('request');
const geocode = (address, callback)=>{
  const url ='https://api.openweathermap.org/data/2.5/weather?q='+address+'&appid=e05adeebc0fc3b89f95d8e8a1c39f0df'
  request({url,json:true}, function(error,response, body){
    if (error) throw new Error(error);
    if(body.cod==404){
      callback(body.message)
    }else
      callback(undefined, {
        longitude : body.coord.lon,
        latitutde : body.coord.lat,
        loctaion : body.name
      })
  })

}
module.exports = geocode
