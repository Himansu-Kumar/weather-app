const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    details.innerHTML = `
        <h5 class="my-2">${data.name}</h5>
        <div class="my-2">${data.weather[0].description}</div>
        <div class="display-6 my-3">
            <span>${data.main.temp}</span>
            <span>&deg;C</span>
        </div>
    `
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
    let timeSrc = null;
    if (data.weather[0].icon.includes('d')) {
        timeSrc = 'img/day.svg';
    }
    else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    let iconSrc = null;
    if (data.weather[0].id>=200 && data.weather[0].id<=232) {
        iconSrc = './img/icons/thunderstorm.svg';
    }
    else if (data.weather[0].id>=300 && data.weather[0].id<=321) {
        iconSrc = './img/icons/drizzle.svg';
    }
    else if (data.weather[0].id>=500 && data.weather[0].id<=531) {
        iconSrc = './img/icons/rain.svg';
    }
    else if (data.weather[0].id>=701 && data.weather[0].id<=781) {
        iconSrc = './img/icons/atmosphere.svg';
    }
    else if (data.weather[0].id==800) {
        iconSrc = './img/icons/clear.svg';
    }
    else if (data.weather[0].id>=801 && data.weather[0].id<=804) {
        iconSrc = './img/icons/clouds.svg';
    }
    icon.setAttribute('src', iconSrc);
}

const updateCity = async (city) => {
    const weather = await getWeather(city);
    return weather;
}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => { updateUI(data) })
        .catch(err => { console.log(err) })
});

const userCity = () => {
    getUserLocation()
        .then(data => updateUI(data))
        .catch(err => console.log(err))
};

userCity();