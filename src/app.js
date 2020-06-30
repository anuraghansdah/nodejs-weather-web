const path = require('path');
const express = require('express');
const hbs = require('hbs');

let geocode = require('./utils/geocode');
let forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000
//define paths for express config.
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
  res.render('index', {
    title : 'Weather App.',
    name : 'Anurag Hansdah'
  })
})
app.get('/about',(req,res)=>{
  res.render('about', {
    title : 'About Me.',
    name : 'Anurag Hansdah'
  })
})
app.get('/help',(req,res)=>{
  res.render('help', {
    helpText : 'Need any help',
    title : 'Help',
    name : 'Anurag Hansdah'
  })
})
app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error : 'You need to provide address.'
    })

  }
  // res.send({
  //   location : 'london',
  //   forecastweather : 'cloudy',
  //   address:req.query.address
  // })

  geocode(req.query.address, (error,{latitutde, longitude, loctaion}={})=>{
    if(error)
    return res.send({error})
    forecast(latitutde,longitude,(error, forecastData)=>{
      if(error)
      return res.send({error})
      const {lat, lon}=forecastData.coord;
      res.send({
        coord:forecastData.coord,
        forecastData:forecastData.weather[0].description,
        address:req.query.address
      })
    })

  })
})
app.get('/help/*', (req,res)=>{
  res.render('404', {
    title : '404',
    name : 'Anurag Hansdah',
    errorMessage : 'Help article not found.'
  })
})
app.get('*', (req, res)=>{
  res.render('404', {
    title : '404',
    name : 'Anurag Hansdah',
    errorMessage : 'page not found.'
  })

})


app.listen(port,()=>{
  console.log('Server Running on localhost:'+ port)
})
