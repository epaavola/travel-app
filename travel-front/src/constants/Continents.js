import * as Constants from './Constants'

const Asia = require('../images/continents/asia.jpg')
const Africa = require('../images/continents/africa.jpg')
const Australia = require('../images/continents/australia.jpg')
const SouthAmerica = require('../images/continents/south_america.jpg')
const NorthAmerica = require('../images/continents/north_america.jpg')
const Europe = require('../images/continents/europe.jpg')

// Continents
export const ContinentsArray = [
    {"name":"Asia","link": "/search", "img": Constants.config.url.SITE_URL + Asia},
    {"name":"Africa","link": "/search", "img": Constants.config.url.SITE_URL + Africa},
    {"name":"Australia & Oceania","link": "/search", "img": Constants.config.url.SITE_URL + Australia},
    {"name":"South-America","link": "/search", "img": Constants.config.url.SITE_URL + SouthAmerica},
    {"name":"Europe","link": "/search", "img": Constants.config.url.SITE_URL + Europe},
    {"name":"North-America","link": "/search ", "img": Constants.config.url.SITE_URL + NorthAmerica},
]