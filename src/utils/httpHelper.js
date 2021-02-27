const baseUrl = 'https://new.api.nexusautotransport.com/api/vehicles/';

export function get({ endpoint, query = "" }) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${endpoint}${query}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then(res => res.json())
      .then(res => resolve(res.data))
      .catch((err) => reject(err))
  });
}