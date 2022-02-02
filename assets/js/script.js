const weatherAppId = 'ddfa6309d6503c702ecfd25217627582';
const geoCodeAppId = 'a3408200abaa9fc8f66c897db160c3ed';

const body = document.querySelector("main");
body.style.display = "none";

// fetch("http://api.openweathermap.org/data/2.5/weather?q=Wroclaw&appid=ddfa6309d6503c702ecfd25217627582")
//     .then(res => res.json())
//     .then(res => {
//         console.log(res);
//         body.style.display = "block";
//     });

const currentLocationPlaceholder = document.querySelector(".current__location");

window.onload = (e) => {
    console.log("ready");
    localStorage.length > 0 ? console.log(localStorage.City) : getUserLocation();
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
    const response = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${geoCodeAppId}&query=${latitude},${longitude}&output=json&limit=1`)
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
    })
}






