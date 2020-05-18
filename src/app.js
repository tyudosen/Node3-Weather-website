const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require("./utils/geoCode")
const weatherApi = require("./utils/weatherApi")

//Define paths for Express config
const dirPath = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3007

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)


//Setup static directory to serve
app.use(express.static(dirPath))

app.get('', (req,res)=>{
    res.render(
        'index',
        {
            title: 'Weather',
            name: 'Toyo'
        }
    )
})

app.get('/about', (req,res) => {
    res.render(
        'about',
        {
            title: 'About Me',
            name: 'Toyo'
        }
    )
})

app.get('/help', (req,res) => {
    res.render(
        'help',
        {
            title: 'Help page',
            name: 'Toyo',
            helpText: 'helpful Text'
        }
    )
})


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send(
            {
                error: 'Location must be provided'
            }
        )
    }
    const location = req.query.address

    geoCode.GeoCode(location, (error,{loc,lat,lon}={})=>{
       if(error){
           return res.send({error})
       }
       weatherApi.WeatherApi(lat,lon,(error,{temp,feelslike,visibility,wind_dir,wind_speed})=>{
           if(error){
               return res.send(
                   {error}
               )
           }
           res.send(
               {
                   loc,
                   temp,
                   feelslike,
                   visibility,
                   wind_dir,
                   wind_speed,
               }
           )
       })
    })

    // res.send(
    //     {
    //         location,
    //         forecast: 'Fucking hot'
    //     }
    // )
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send(
            {
                error: 'NO SEARCH!!'
            }
        )
    }
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*', (req,res) => {
    res.render(
        'help404Page',
        {
            title: 'Help404_Page',
            text: `Help's helper`,
            name: 'Toyo'
        }
    )
})
app.get('*', (req,res)=>{
    res.render(
        'main404Page',
        {
            title: '404_Page',
            text: `No Page`,
            name: 'Toyo'
        }
    )
})

app.listen(port, () => {
    console.log('Server up on port 3000(locally) and ' + port + ' on heroku')
})


//app.com
//app.com/help
//app.com/about