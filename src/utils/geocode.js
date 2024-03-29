const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY3JvZnR0aW1lIiwiYSI6ImNrMzk3cWt3ZTAwYXozZG82ajN5MGFtbjAifQ.F6pumGtPxlYpJModDJAHYQ&limit=1'

    request({url: url,json:true},(error,response)=>{
        if (error) {
            callback('Unable to Connect to Location Services')
        }
        else if (response.body.features.length ===0) {
            callback('Unable to find location.  Try another Search',undefined)
        }
        else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode