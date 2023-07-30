const BASE_URL = 'https://api.weatherapi.com/v1/current.json';
const API_KEY = '6c14be175ddd4d58b1f171256232807';

async function getCoordinates() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          resolve(coordinates);
        },
        () => {
          reject('Unable to retrieve your location');
        }
      );
    }
  });
}

export async function fetchWeather() {
  try {
    let query = 'kharkiv';
    try {
      const coordinates = await getCoordinates();
      query = `${coordinates.lat},${coordinates.lon}`;
    } catch (error) {
      console.error('Using default location.', error);
    }
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error fetching the weather:', error);
    throw error;
  }
}
