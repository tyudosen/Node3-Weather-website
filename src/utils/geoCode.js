const request = require('postman-request')
const cout = console.log

const GeoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHl1ZG9zZW4iLCJhIjoiY2thNGthOThhMDBkeTNnb2d1Z2MweXg1ZCJ9.ekHSs4glscOufHoVghMvGA&limit=1'

    const options = {
        url: url,
        json: true
    }
    request(options, (error,response, {features}) => {
        if(error){callback('Could not connect to location services',undefined)}
        else if(features.length === 0){callback('Unable to find location.Try another search', undefined)}
        else{
            callback(
                undefined,
                {
                    loc: features[0].place_name,
                    lat: features[0].center[0],
                    lon: features[0].center[1]
                }
            )
        }
    })

}

module.exports = {
    GeoCode: GeoCode
}