const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchAISearch(query, latitude = null, longitude = null, locationName = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        latitude,
        longitude,
        location_name: locationName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('AI Search Error:', error);
    throw error;
  }
}

export async function fetchPlan(date, time, target, latitude = null, longitude = null, locationName = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        time,
        target,
        latitude,
        longitude,
        location_name: locationName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Plan Error:', error);
    throw error;
  }
}
