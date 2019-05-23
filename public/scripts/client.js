const form = document.querySelector('#search-form');
const search = document.querySelector('#search-text');
const searchButton = document.querySelector('#search-button');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchButton.setAttribute('disabled', 'disabled');
    messageOne.textContent = '';
    messageTwo.textContent = 'Loading...';

    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                const { location, forecast } = data;
                const weather = forecast.dailySummary + ' It is currently ' + forecast.temperature + ' degree celcious out. There is a ' + forecast.precipProbability + '% chance of rain.'
                messageOne.textContent = location;
                messageTwo.textContent = weather;
            }
            searchButton.removeAttribute('disabled');
        });
    })
    .catch((error) => {
        console.log(error);
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
        searchButton.removeAttribute('disabled');
    });
});