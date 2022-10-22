console.log("hello wrld");

const container = document.querySelector(".container");

const city = document.createElement("p");
const country = document.createElement("p");
const temperature = document.createElement("p");
const description = document.createElement("p");
const btn = document.createElement("button");
const searchBox = document.createElement("input");

btn.textContent = "New City";
city.textContent = "city";
country.textContent = "country";
temperature.textContent = "temperature";
description.textContent = "description";

searchBox.value = "London";

container.append(btn);
container.append(searchBox);

container.append(city, country, temperature, description);

btn.addEventListener("click", getWeather);

async function getWeather() {
    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=793fe266f05f0bb2bf84ac67ef8dc4ab`,
            {
                mode: "cors",
            }
        );
        const weatherData = await response.json();
        city.textContent = `City: ${weatherData.name}`;
        country.textContent = `Country: ${weatherData.sys.country}`;
        temperature.textContent = `Temp: ${weatherData.main.temp - 273}`;
        description.textContent = `Desc.: ${weatherData.weather[0].description}`;
        console.log(weatherData.name);
    } catch (err) {
        console.log(err);
    }
}
getWeather();

fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=793fe266f05f0bb2bf84ac67ef8dc4ab",
    {
        mode: "cors",
    }
)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
    });

//fetch async await try catch
// 793fe266f05f0bb2bf84ac67ef8dc4ab
