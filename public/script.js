const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchContainer = document.querySelector(".search");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-icon button"); 
const weatherIcon = document.querySelector(".weather i");
const weather = document.querySelector(".weather");

async function checkWeather(city) {
    if (!city) return;

    try {
        // const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();
        console.log(data);

        if (data.cod != 200) {
            alert("Invalid city name");
            searchBox.value = "";
            weather.style.display = "none";
            return;
        }

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        let currentTime = data.dt;
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;

        if (data.weather[0].main == "Clouds")
            weatherIcon.classList.replace(weatherIcon.classList.item(2), "fa-cloud");
        else if (data.weather[0].main == "Clear") {
            if (currentTime >= sunrise && currentTime < sunset)
                weatherIcon.classList.replace(weatherIcon.classList.item(2), "fa-sun");
            else
                weatherIcon.classList.replace(weatherIcon.classList.item(2), "fa-moon");
        }
        else if (data.weather[0].main == "Rain")
            weatherIcon.classList.replace(weatherIcon.classList.item(2), "fa-cloud-rain");
        else if (data.weather[0].main == "Drizzle")
            weatherIcon.classList.replace(weatherIcon.classList.item(2), "fa-cloud-rain");
        else if (data.weather[0].main == "Mist")
            weatherIcon.classList.replace(weatherIcon.classList.item(2), "fa-smog");

        weather.style.display = "block";

        if (currentTime >= sunrise && currentTime < sunset) {
            document.body.classList.add("day");
            document.body.classList.remove("night");
        } else {
            document.body.classList.add("night");
            document.body.classList.remove("day");
        }
    } catch (err) {
        console.error(err);
        alert("Error fetching weather data");
    }
}

searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!searchContainer.classList.contains("expanded")) {
        searchContainer.classList.add("expanded");
        searchBox.focus();
    } else {
        checkWeather(searchBox.value);
    }
});

document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
        searchContainer.classList.remove("expanded");
    }
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
