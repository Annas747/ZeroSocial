// API Configuration for production and development
const API_URL = import.meta.env.VITE_API_URL || '';

// Helper to get full image URL
export function getImageUrl(url) {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads')) {
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        return `${backendUrl}${url}`;
    }
    return url;
}

export default API_URL;
