import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';

const axiosInstance = axios.create({
  baseURL: base,
});

// helper to build auth headers for Firebase user
export async function authHeadersFromUser(user) {
  if (!user || typeof user.getIdToken !== 'function') return {};
  try {
    // force refresh to ensure token is valid (especially right after sign-in)
    const token = await user.getIdToken(true);
    return { Authorization: `Bearer ${token}` };
  } catch (e) {
    console.warn('Could not get id token', e);
    return {};
  }
}

export default function useAxios() {
  return axiosInstance;
}
