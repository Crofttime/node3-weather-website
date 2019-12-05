const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Value will be equal to process.env.PORT if exist, otherwise 3000
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
// defaults to 'view' directory use this to change
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=> {
    res.render('index',{
        title:'Weather',
        name:'Matt'
    })
})

app.get('/about',(req, res)=> {
    res.render('about',{
        title:'About Me',
        name:'Matt'
    })
})

app.get('/help',(req, res)=> {
    res.render('help',{
        helptext:'Help Me',
        title:'Help',
        name:'Matt'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData) =>{
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you much provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        errorText:'Help Article Not Found',
        name:'Matt'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorText:'Page Not Found',
        name:'Matt'
    })
})

//app.com
//app.com/help
//app.com/about

// develop port 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})