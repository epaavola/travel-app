import * as Constants from './Constants'

const organizationImg = require('../images/continents/europe.jpg')
const polarIMG = require('../images/types/polar.jpeg')
const hikingIMG = require('../images/types/hiking.jpeg')
const safariIMG = require('../images/types/safari.jpeg')

export const skillsArray = [
    "Easy",
    "Active",
    "Extreme",
]

export const skillsData = [
    {"name":"Easy","link": "/search", "img": Constants.config.url.SITE_URL + hikingIMG},
    {"name":"Active","link": "/search", "img": Constants.config.url.SITE_URL + safariIMG},
    {"name":"Extreme","link": "/search", "img": Constants.config.url.SITE_URL + polarIMG},
]