const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-icon");
const weatherIcon = document.querySelector(".weather i");
const weather = document.querySelector(".weather");

async function checkWeather (city){
    // const response = await fetch(apiUrl+city+`&appid=${apiKey}`);
    const response = await fetch(`/api/weather?city=${city}`);
    var data = await response.json();
    console.log(data);
    if(data.cod!=200){
        alert("Invalid city name");
        searchBox.value = "";
        weather.style.display = "none";
    }
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity+ "%";
    document.querySelector(".wind").innerHTML = data.wind.speed+" km/h";

    let currentTime = data.dt;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;

    if(data.weather[0].main=="Clouds")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-cloud");
    else if(data.weather[0].main=="Clear"){
        if(currentTime >= sunrise && currentTime < sunset)
            weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-sun");
        else
            weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-moon");
    }
    else if(data.weather[0].main=="Rain")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-cloud-rain");
    else if(data.weather[0].main=="Drizzle")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-cloud-rain");
    else if(data.weather[0].main=="Mist")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-smog");

    weather.style.display = "block";

    if (currentTime >= sunrise && currentTime < sunset) {
        document.body.classList.add("day");
        document.body.classList.remove("night");
    } else {
        document.body.classList.add("night");
        document.body.classList.remove("day");
    }
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})