import * as Constants from './Constants'

// Organizations
export const SVKMissio = "SVK Missio"
export const operaatioMobilisaatio = "Operaatio Mobilisaatio"
export const YWAM = "YWAM"
export const fidaInternational  = "Fida International"

const organizationImg = require('../images/continents/europe.jpg')

export const organizationsArray = [
    "Xtreme Adventures",
    "YourTourCompany",
    "WildLife Tours",
    "Safari Trips",
]

export const organizationsData = [
    {"name":"Xtreme Adventures","link": "/search", "img": Constants.config.url.SITE_URL + organizationImg},
    {"name":"YourTourCompany","link": "/search", "img": Constants.config.url.SITE_URL + organizationImg},
    {"name":"WildLife Tours","link": "/search", "img": Constants.config.url.SITE_URL + organizationImg},
    {"name":"Safari Trips","link": "/search", "img": Constants.config.url.SITE_URL + organizationImg},
]