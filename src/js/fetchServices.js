const BASE_URL = 'https://sigma-hw-04.lm.r.appspot.com/api/service/';
// const BASE_URL = 'localhost:8080/api/service/';

export async function fetchAllServices({ page, limit }) {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error fetching the services:', error);
    throw error;
  }
}

export async function fetchServicesByCategory({ categoryName, page, limit }) {
  try {
    const response = await fetch(`${BASE_URL}${categoryName}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error fetching the services:', error);
    throw error;
  }
}
