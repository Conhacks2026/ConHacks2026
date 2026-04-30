import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000,
  headers: { 'Content-Type': 'application/json' },
});

const postLong = async (path, payload, timeoutMs = 120000) => {
  const response = await http.post(path, payload, { timeout: timeoutMs });
  return response?.data;
};

const post = async (path, payload) => {
  const response = await http.post(path, payload);
  return response?.data;
};

export const getPlan = (payload) => postLong('/api/plan', payload, 120000);
export const getFuture = (payload) => postLong('/api/future', payload, 120000);
export const getNearby = (payload) => postLong('/api/nearby', payload, 120000);
export const getUpcomingMoments = (payload) => postLong('/api/upcoming-moments', payload, 120000);
export const getEvents = (payload) => postLong('/api/events', payload, 90000);
export const aiSearch = (payload) => postLong('/api/ai-search', payload, 120000);

/** POST /api/location-suggest — Google-backed suggestions when API key is configured. */
export const getLocationSuggestions = (query, limit = 6) =>
  post('/api/location-suggest', { query, limit });
