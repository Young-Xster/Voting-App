const config = {
  development: {
    SERVER_URL: 'http://localhost:8090'
  },
  production: {
    SERVER_URL: import.meta.env.VITE_SERVER_URL || 'https://voting-app-server-production.up.railway.app'
  }
}

const environment = import.meta.env.MODE || 'development'
export default config[environment]
