import { fetchWeather } from './weatherAPI';

const widget = document.querySelector('.weather-widget');

fetchWeather()
  .then(weather => {
    let markup;
    weather.location.name === 'Kiev'
      ? (markup = `
    <img class="weather-widget__icon" src="${weather.current.condition.icon}" alt="${weather.current.condition.text}">
    <p class="weather-widget__city">Kyiv</p>
    <p class="weather-widget__temp">${weather.current.temp_c}°</p>
    `)
      : (markup = `
    <img class="weather-widget__icon" src="${weather.current.condition.icon}" alt="${weather.current.condition.text}">
    <p class="weather-widget__city">${weather.location.name}</p>
    <p class="weather-widget__temp">${weather.current.temp_c}°</p>
    `);

    widget.innerHTML = markup;
  })
  .catch(error => {
    console.error('Failed to build weather widget:', error);
  });
