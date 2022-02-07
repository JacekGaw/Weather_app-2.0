const weatherAppId = 'ddfa6309d6503c702ecfd25217627582';
const currentLocationPlaceholder = document.querySelector(".current__location");
const output = document.querySelector(".output__info");
const input = document.querySelector(".header__search-input");
const loader = document.querySelector(".output__loader");
const submit = document.querySelector(".header__search-button");
const startContainer = document.querySelector(".start");


const body = document.querySelector("main");
body.style.display = "none";


window.onload = (e) => {
    startContainer.style.display = "flex";
    if(localStorage.length > 0) {
        fetchWeather(localStorage.latitude, localStorage.longitude);
    }
    else {
        getUserLocation();
    }
}

const getUserLocation = () => {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(getCords) : console.log(" ");
};

const getCords = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    localStorage.latitude = latitude;
    localStorage.longitude = longitude;
    fetchWeather(latitude, longitude);
}

const fetchWeather = async (latitude, longitude) => {
    output.style.display = "none";
    loader.style.display = "block";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${weatherAppId}&units=metric`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error;
        }
    })
    .then(responseJSON => {
        displayWeatherBlock(responseJSON);
    })
    .catch(error => {
        console.log(error);
        output.style.display = "block";
        output.innerHTML = "We couldn't find weather info for this location. Try different one!";
        input.value = "";
        input.focus();
    });
    loader.style.display = "none";
}

const geoCode = async (city) => {
    loader.style.display = "block";
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherAppId}`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error;
        }})
    .then(responseJSON => {
        if(responseJSON.length > 0){
            fetchWeather(responseJSON[0].lat, responseJSON[0].lon);
        }
        else {
            throw new Error;
        }
    })
    .catch(error => {
        output.style.display = "block";
        output.innerHTML = `We couldn't get your location. Try type it manualy above!`;
        input.focus();
    });
    loader.style.display = "none";
}

submit.addEventListener('click', (event) => {
    geoCode(input.value);
    event.preventDefault();
});



// const getCity = async (latitude, longitude) => {
//     loader.style.display = "block";
//     const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${weatherAppId}`)
//     .then(response => response.json())
//     .then(responseJSON => {
//         // console.log(responseJSON[0].name);
//     })
//     .catch(error => {
//         console.log(error);
//     })
//     loader.style.display = "none";
// }


class CurrentWeather {
    constructor(weatherInfo) {
        this.temp = weatherInfo.current.temp;
        this.dateCode = weatherInfo.current.dt;
        this.desc = weatherInfo.current.weather[0].description;
        this.sunriseCode = weatherInfo.current.sunrise;
        this.sunsetCode = weatherInfo.current.sunset;
        this.clouds = weatherInfo.current.clouds;
        weatherInfo.current.rain ? this.rain = weatherInfo.current.rain["1h"] : null;
        weatherInfo.current.snow ? this.snow = weatherInfo.current.snow["1h"] : null;
        this.humidity = weatherInfo.current.humidity;
        this.windSpeed = weatherInfo.current.wind_speed;
        weatherInfo.current.wind_gust ? this.windGust = weatherInfo.current.wind_gust : this.windGust = this.windSpeed;
        this.windDeg = weatherInfo.current.wind_deg;
        this.pressure = weatherInfo.current.pressure
        weatherInfo.alerts ? this.alert = weatherInfo.alerts[0].description : null;
    }
    
    // convertSunset() {
    //     let unix = this.sunsetCode;
    //     unix = unix * 1000;
    //     const dateObj = new Date(unix);
    //     const hour = dateObj.toLocaleString("UE", {hour: "numeric"});
    //     const minute = dateObj.toLocaleString("UE", {minute: "numeric"});
    //     this.sunset = `Sunset: ${hour}:${minute}`;
    // }
    // getAlerts() {
    //     if(weatherInfo.alerts[0].description) {
    //         this.alert = weatherInfo.alerts[0].description;
    //     }
    //     else
    //         return 0;
    // }
    fillTemp(){
        document.querySelector(".container-item__main-temp__temperature").innerHTML = this.temp;
    }
};

const displayWeatherBlock = weatherInfo => {
    console.log(weatherInfo)
    startContainer.style.display = "none";
    body.style.display = "block";
    const todayWeather = new CurrentWeather(weatherInfo);
    console.log(todayWeather);
};
