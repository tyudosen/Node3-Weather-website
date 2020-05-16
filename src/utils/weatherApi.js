const request = require('postman-request')
const cout = console.log

const WeatherApi = (lat,lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b8c06b7df67c1d95432051b70b768715&query=' + lat + ',' + lon + '&units=f'

    const options = {
        url,
        json: true
    }
    request(options, (error,response,body) => {
        if(error){callback('Unable to connect to weather api', undefined)}
        else if(body.error){callback('Invalid location. Search again', undefined)}
        else{
            callback(
                undefined,
                {
                    temp: body.current.temperature,
                    feelslike: body.current.feelslike
                },
            )
        }
    })

}

module.exports = {
    WeatherApi
}