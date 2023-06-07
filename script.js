const apiKey = "b1bfa8ad382529a9387bd30cee69bec9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

async function getWeatherData(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayWeatherData(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  const weatherInfo = document.createElement("div");
  weatherInfo.innerHTML = `<h2>${city}</h2><p>${temperature}°C</p><p>${description}</p>`;

  document.getElementById("weather-data").appendChild(weatherInfo);
}

function clearWeatherData() {
  const weatherDataContainer = document.getElementById("weather-data");
  while (weatherDataContainer.firstChild) {
    weatherDataContainer.removeChild(weatherDataContainer.firstChild);
  }
}

function main() {
  const locationInput = document.getElementById("location-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");

  getWeatherBtn.addEventListener("click", async () => {
    const location = locationInput.value;
    if (location) {
      try {
        clearWeatherData();
        const weatherData = await getWeatherData(location);
        displayWeatherData(weatherData);
      } catch (error) {
        console.error("Wystąpił błąd:", error.message);
      }
    }
  });
}

main();
