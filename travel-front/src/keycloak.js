import Keycloak from 'keycloak-js'
import { config } from './constants/Constants'

const keycloakConfig = {
    url: `${config.url.KEYCLOAK_BASE_URL}`,
    realm: `${config.keycloak.REALM}`,
    clientId: `${config.keycloak.CLIENT}`
}

const keycloak = new Keycloak(keycloakConfig)

export default keycloak