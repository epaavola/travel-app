const prod = {
    url: {
      SITE_URL: 'https://travel.paavolagroup.fi',
      KEYCLOAK_BASE_URL: 'https://hallinta.travel.paavolagroup.fi/auth',
      API_BASE_URL: 'https://api.travel.paavolagroup.fi',
      MISSIONS_API_URL: 'https://api.travel.paavolagroup.fi/api/v1/missions/',
      FILE_API_URL: 'https://api.travel.paavolagroup.fi/api/v1/files/'
    },
    keycloak: {
      REALM: 'Travel-app',
      CLIENT: 'travel-service'
    }
  }
  
  const dev = {
    url: {
      SITE_URL: 'http://localhost:3000',
      KEYCLOAK_BASE_URL: 'http://localhost:8080/auth',
      API_BASE_URL: 'http://localhost:8000',
      MISSIONS_API_URL: 'http://localhost:8000/api/v1/missions/',
      FILE_API_URL: 'http://localhost:8000/api/v1/files/'
    },
    keycloak: {
      REALM: "Travel-app",
      CLIENT: "travel-service"
    }
  }
  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod

