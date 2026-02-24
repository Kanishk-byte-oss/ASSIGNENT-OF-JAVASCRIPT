async function getWeather() {
  const cityInput = document.getElementById("city");
  const output = document.getElementById("output");
  const city = cityInput.value.trim();

  if (!city) {
    output.textContent = "Please enter a city name.";
    return;
  }

  output.textContent = "Fetching weather data...";

  try {
    // Step 1: Get Coordinates
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      output.textContent = "City not found.";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Get Weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    if (!weatherData.current_weather) {
      output.textContent = "Weather data unavailable.";
      return;
    }

    const { temperature, windspeed } = weatherData.current_weather;

    // Step 3: Display Data
    output.innerHTML = `
      📍 <strong>${name}, ${country}</strong><br>
      🌡 Temperature: <strong>${temperature}°C</strong><br>
      🌬 Wind Speed: <strong>${windspeed} km/h</strong>
    `;

  } catch (error) {
    output.textContent = "Error fetching weather data.";
    console.error(error);
  }
}

// Enter key support
function handleEnter(event) {
  if (event.key === "Enter") {
    getWeather();
  }
}

// Auto focus input on load
window.onload = () => {
  document.getElementById("city").focus();
};