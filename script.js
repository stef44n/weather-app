const container = document.querySelector(".container");

const searchContainer = document.createElement("div");
const descContainer = document.createElement("div");
const countryContainer = document.createElement("div");

const city = document.createElement("p");
const country = document.createElement("p");
const temperature = document.createElement("p");
const description = document.createElement("p");

const btn = document.createElement("button");
const searchBox = document.createElement("input");

const iconImg = document.createElement("img");
const flagImg = document.createElement("img");
const gifImageDiv = document.createElement("div");
const gifImage = document.createElement("img");

btn.textContent = "New City";
city.textContent = "city";
country.textContent = "country";
temperature.textContent = "temperature";
description.textContent = "description";

searchBox.value = "London";

searchContainer.setAttribute("class", "searchContainer");
descContainer.setAttribute("class", "descContainer");
countryContainer.setAttribute("class", "countryContainer");
gifImageDiv.setAttribute("class", "gifImageDiv");
flagImg.setAttribute("class", "flagImg");

container.append(searchContainer);
searchContainer.append(searchBox);
searchContainer.append(btn);

countryContainer.append(country, flagImg);

container.append(city, countryContainer, temperature);
container.append(descContainer);
descContainer.append(description, iconImg);
container.append(gifImageDiv);
gifImageDiv.append(gifImage);

btn.addEventListener("click", getWeather);

const getLoader = () => {
    let loader = document.createElement("div");
    loader.setAttribute("class", "loader");
    gifImageDiv.append(loader);

    for (i = 0; i < 10; i++) {
        let wave = document.createElement("div");
        wave.setAttribute("class", "wave");
        loader.append(wave);
    }
    return { loader };
};

const killLoader = () => {
    let loaders = document.querySelectorAll(".loader");
    loaders.forEach((el) => {
        el.remove();
    });
};

async function getWeather() {
    try {
        gifImage.src = "";
        getLoader();
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&APPID=793fe266f05f0bb2bf84ac67ef8dc4ab`,
            {
                mode: "cors",
            }
        );
        const weatherData = await response.json();

        cityData = weatherData.name;
        countryData = weatherData.sys.country;
        tempData = weatherData.main.temp - 273.15;
        roundedTempData = Math.round(tempData * 10) / 10;
        descData = weatherData.weather[0].description;
        descMainData = weatherData.weather[0].main;
        iconData = weatherData.weather[0].icon;

        city.textContent = `City: ${cityData}`;
        country.textContent = `Country: ${countryData}`;
        temperature.textContent = `Temp: ${roundedTempData} \xB0C`;
        description.textContent = `Description: ${descData}`;
        iconImg.src = `https://openweathermap.org/img/wn/${iconData}@2x.png`;
        flagImg.src = `https://www.countryflagicons.com/FLAT/64/${countryData}.png`;

        console.log(descMainData);
        console.log(iconData);

        const gifImg = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=yeGHRJLlJBFWFkzncQKGEZDEMOTDXeVF&s=${descMainData}`,
            { mode: "cors" }
        );
        const gifData = await gifImg.json();
        killLoader();
        gifImage.src = gifData.data.images.original.url;
    } catch (err) {
        console.log(err);
        searchBox.value = "Error - city not found";
        killLoader();
    }
}
getWeather();

fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=793fe266f05f0bb2bf84ac67ef8dc4ab",
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
