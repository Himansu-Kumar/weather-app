const key = '97792accb9b9a769723d3cc79a9a3272';

const getWeather = async (city) => {
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&appid=${key}&units=metric`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
}

const success = async (pos) => {
    const longitude = pos.coords.longitude;
    const latitude = pos.coords.latitude;
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    const response = await fetch(base + query)
    const data = await response.json();
    return data;
}

const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            const data = navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const userWeather = await success(pos);
                    resolve(userWeather);
                },
                (err) => {
                    reject('Location permission denied by user.');
                }
            );
        }
        else {
            reject('Geolocation not supported by browser.');
        }
    })
}