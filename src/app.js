// core modules
const path = require('path');

// modules from `node_modules`
const express = require('express');
const hbs = require('hbs');

// custom modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// create server
const app = express();

// paths for express configs
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views/templates');
const partialsPath = path.join(__dirname, '../views/partials');

// set public/static folder
app.use(express.static(publicPath));

// set view engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

const name = 'Sumit Zamadar';

// set routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: name
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!req.query.address) {
        return res.send({
            error: 'Please enter address'
        });
    }

    geocode(address, (error, locationData) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        const { latitude, longitude, place } = locationData;
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            const { dailySummary, temperature, precipProbability } = forecastData;
            res.send({
                address: address,
                location: place,
                forecast: forecastData
            });
        });
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: name
    });
});

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        description: 'Page not found!',
        name: name
    });
});

// set server to lister port 3000
app.listen(3000, () => {
    console.log('Server is running on port number 3000');
});