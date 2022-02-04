const weatherAppId = 'ddfa6309d6503c702ecfd25217627582';
const geoCodeAppId = 'a3408200abaa9fc8f66c897db160c3ed';
const currentLocationPlaceholder = document.querySelector(".current__location");
const output = document.querySelector(".output__info");
const input = document.querySelector(".header__search-input");
const loader = document.querySelector(".output__loader");


const body = document.querySelector("main");
body.style.display = "none";


window.onload = (e) => {
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
    loader.style.display = "block";
    const response = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${geoCodeAppId}&query=${latitude},${longitude}&output=json&limit=1`, { mode: 'no-cors'})
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else {
            throw new Error("Something went wrong!");
        }})
    .then(responseJSON => {
        console.log(responseJSON.data[0].locality);
        localStorage['City'] = responseJSON.data[0].locality;
        if(responseJSON.data[0].locality == undefined){
            throw new Error("Coudn't get your Location");
        }
    })
    .catch(error => {
        console.log(error);
        output.innerHTML = `We couldn't get your location. Try type it manualy above!`;
        input.focus();
    });
    loader.style.display = "none";
}






