const apiKey = "03c6f7278e26a28ba149829eafc7123a";

const weatherData = document.querySelector("#weather-data");

const cityInput = document.querySelector("#city-input");
const iconElement = document.querySelector(".icon");

const details = document.querySelector(".details");

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;

  getWeatherData(cityValue);
});

const getWeatherData = async (cityValue) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed ${data.wind.speed} m/s`,
    ];
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="weather icon">`;
    weatherData.querySelector(".temperature").innerText = `${temperature}°C`;
    weatherData.querySelector(".description").innerText = `${description}`;
    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    iconElement.innerHTML = ``;
    weatherData.querySelector(".temperature").innerText = ``;
    weatherData.querySelector(
      ".description"
    ).innerText = `An error happened. Please enter correct city name`;
    weatherData.querySelector(".description").style.color = "red";
    weatherData.querySelector(".details").innerHTML = "";
  }
};
