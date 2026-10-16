
const cache = new Map();

export async function fetchWithCache(url, options = {}) {
  const method = (options.method || "GET").toUpperCase();

  // Do not cache POST, PUT, PATCH, or DELETE requests.
  if (method !== "GET") {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    return response.json();
  }

  if (cache.has(url)) {
    return cache.get(url);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data = await response.json();
  cache.set(url, data);

  return data;
}

export function clearDoctorCache() {
  cache.clear();
}
