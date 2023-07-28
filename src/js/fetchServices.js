const BASE_URL = 'https://sigma-hw-04.lm.r.appspot.com/api/service/';

export async function fetchAllServices({ page, limit }) {
  const savedServices = localStorage.getItem('all');
  if (savedServices) {
    return JSON.parse(savedServices);
  }
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    localStorage.setItem('all', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('There was an error fetching the services:', error);
    throw error;
  }
}

export async function fetchServicesByCategory({ categoryName, page, limit }) {
  const savedServices = localStorage.getItem(categoryName);
  if (savedServices) {
    return JSON.parse(savedServices);
  }
  try {
    const response = await fetch(`${BASE_URL}${categoryName}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    localStorage.setItem(categoryName, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('There was an error fetching the services:', error);
    throw error;
  }
}
