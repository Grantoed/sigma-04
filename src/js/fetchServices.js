const BASE_URL = 'https://sigma-hw-04.lm.r.appspot.com/api/service/';

async function fetchAllServices({ page, limit }) {
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

async function saveServicesByCategory() {
  const { services } = await fetchAllServices({ page: 1, limit: 12 });
  if (services) {
    const interior = services
      .filter(service => service.serviceCategory === 'interior_design')
      .slice(0, 3);
    const architecture = services
      .filter(service => service.serviceCategory === 'architecture')
      .slice(0, 3);
    const planning = services.filter(service => service.serviceCategory === 'planning').slice(0, 3);
    const all = [...interior, ...architecture, ...planning];
    localStorage.setItem('all', JSON.stringify(all));
    localStorage.setItem('interior', JSON.stringify(interior));
    localStorage.setItem('architecture', JSON.stringify(architecture));
    localStorage.setItem('planning', JSON.stringify(planning));
  }
}

saveServicesByCategory();
