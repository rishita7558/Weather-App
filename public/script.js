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

    if(data.weather[0].main=="Clouds")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-cloud");
    else if(data.weather[0].main=="Clear")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-sun");
    else if(data.weather[0].main=="Rain")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-cloud-rain");
    else if(data.weather[0].main=="Drizzle")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-cloud-rain");
    else if(data.weather[0].main=="Mist")
        weatherIcon.classList.replace(weatherIcon.classList.item(2),"fa-smog");

    weather.style.display = "block";
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})