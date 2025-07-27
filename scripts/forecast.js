const key = 'SsHByX4O2C2EW83RtMvhtcbGHtCwVa8N';

const getWeather = async (id) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
}

const getCity = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
}

const success = async (pos) => {
    const longitude = pos.coords.longitude;
    const latitude = pos.coords.latitude;
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    const query = `?apikey=${key}&q=${latitude},${longitude}`;
    const response = await fetch(base + query)
    const data = await response.json();
    return data;
}

const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            const data = navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const cityDetails = success(pos);
                    resolve(cityDetails);;
                },
                (err) => {
                    reject('Location permission denied by user.')
                }
            );
        }
        else {
            reject('Geolocation not supported by browser.');
        }
    })
}