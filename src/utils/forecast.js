const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const token = '';  //api key
    const url = 'https://api.darksky.net/forecast/'+ token +'/'+ latitude +','+ longitude +'?units=si';
    
    request({url, json: true}, (error, response) => {
        const { body } = response;
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location!');
        } else {
            const daily = body.daily.data[0];
            const currently = body.currently;

            callback(undefined, {
                dailySummary: daily.summary,
                temperature: currently.temperature,
                precipProbability: currently.precipProbability
            })
        }
    });
};

module.exports = forecast;
