const weatherAppId = 'ddfa6309d6503c702ecfd25217627582';
const geoCodeAppId = '908338042750688926617x14133';
const currentLocationPlaceholder = document.querySelector(".current__location");


const body = document.querySelector("main");
body.style.display = "none";


window.onload = (e) => {
    console.log("ready");
    localStorage.length > 0 && localStorage.City !== undefined ? console.log(localStorage.City) : getUserLocation();
    // getUserLocation();
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
    const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?json=1&auth=${geoCodeAppId}`)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error("Something went wrong!");
        }})
    .then(responseJSON => {
        localStorage['City'] = responseJSON.city;
        if(responseJSON.city == undefined){
            throw new Error("Coudn't get your Location");
        }
        console.log(responseJSON.city)
    })
    .catch(error => {
        console.log(error);
    })
}






