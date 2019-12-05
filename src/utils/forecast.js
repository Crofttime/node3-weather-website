const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ef8d3908dc72aa4e762d2ffdae530f6f/'+latitude+','+longitude

    request({url,json:true},(error,{body})=>{
        if (error) {
            callback('Unable to connect to weather service',undefined)
        }
        else if (body.error) {
            callback('Unable to find Location',undefined)
        }
        else {
            currenttemp = body.currently.temperature
            precipprob = body.currently.precipProbability        
            callback(undefined,body.daily.data[0].summary+" It is currently " + currenttemp + "deg.  There is a "+ precipprob + "% chance of rain")
        }
    })
}

module.exports = forecast