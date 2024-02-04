//////////////////////////////GETTING REQUIRED ELEMENTS////////////////////////////////
const button = document.getElementById('search-button');
const input = document.getElementById('input');

const getLocationButton = document.getElementById('getlocation-button');

const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');




////////////////////////////////GETTING WEATHER THROUGH CITY NAME////////////////////////////////
async function getData(cityName) {

    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=f3c8fbaceebe41ca97c82854242001&q=${cityName}&aqi=yes`
        );
        return await promise.json();
}

////////////////////////////////ON MANUALLY ENTERING CITY////////////////////////////////
button.addEventListener('click',async () => {
    const value = input.value;
    const result = await getData(value);
    cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`
    cityTime.innerText = `${result.location.localtime}`
    cityTemp.innerText = `${result.current.temp_c} Degree Celsius`
})




////////////////////////////////GETTING WEATHER THROUGH LATITUDE AND LONGITUDE////////////////////////////////
async function getData(latitude, longitude) {

    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=f3c8fbaceebe41ca97c82854242001&q=${latitude},${longitude}&aqi=yes`
        );
        return await promise.json();
}

////////////////////////////////ON GETTING LIVE LOCATION////////////////////////////////
async function gotLocation(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const locationResult = await getData(latitude, longitude)
    cityName.innerText = `${locationResult.location.name}, ${locationResult.location.region} - ${locationResult.location.country}`
    cityTime.innerText = `${locationResult.location.localtime}`
    cityTemp.innerText = `${locationResult.current.temp_c} Degree Celsius`  
}


function failedToGet() {
    cityName.innerText = 'Failed to get Current Location';
}


getLocationButton.addEventListener('click', async () => {
    navigator.geolocation.getCurrentPosition(gotLocation,failedToGet)
});
