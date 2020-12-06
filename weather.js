const temperatue_txt = document.querySelector(".js_temperatue");
const place_txt = document.querySelector(".js_place");
const mainWeather_txt = document.querySelector(".js_mainWeather");

const COORDS = "coords";
const API_KEY = "f6c2da05574b232acaf2e8901d44ad0e";

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };
    
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cna not access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json()
        }).then(function(json){
            console.log(json)
            const temperatue = json.main.temp;
            const place = json.name;
            const mainWeather = json.weather[0].description;
            temperatue_txt.innerText = `${temperatue}°`;
            place_txt.innerText = `@${place}`;
            mainWeather_txt.innerText = `${mainWeather}`;
        })

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();