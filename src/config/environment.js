// Environment configuration for server URL
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'https://voting-app-server-production.up.railway.app';

const config = {
  SERVER_URL: SERVER_URL
};

export default config;
