const weatherAppId = 'ddfa6309d6503c702ecfd25217627582';
const currentLocationPlaceholder = document.querySelector(".current__location");
const output = document.querySelector(".output__info");
const input = document.querySelector(".header__search-input");
const loader = document.querySelector(".output__loader");
const submit = document.querySelector(".header__search-button");


const body = document.querySelector("main");
body.style.display = "none";


window.onload = (e) => {
    if(localStorage.length > 0 && localStorage.City !== undefined) {
        console.log(localStorage.City); 
        fetchWeather(localStorage.City);
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
    geoCode(latitude, longitude);
}

const geoCode = async (latitude,longitude) => {
    loader.style.display = "block";
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${weatherAppId}`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error;
        }})
    .then(responseJSON => {
        console.log(responseJSON[0].name);
        localStorage['City'] = responseJSON[0].name;
        fetchWeather(responseJSON[0].name);
        if(responseJSON[0].name == undefined){
            throw new Error;
        }
    })
    .catch(error => {
        console.log(error);
        output.innerHTML = `We couldn't get your location. Try type it manualy above!`;
        input.focus();
    });
    loader.style.display = "none";
}

submit.addEventListener('click', () => {
    fetchWeather(input.value);
    event.preventDefault();
});

const fetchWeather = async (location) => {
    output.style.display = "none";
    loader.style.display = "block";
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherAppId}`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error;
        }
    })
    .then(responseJSON => {
        console.log(responseJSON);
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




