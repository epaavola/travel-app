import * as Constants from './Constants'
// Missio types

export const safari = "Safari"
export const hiking = "Hiking"
export const camping = "Camping"
export const polar = "Polar"
export const sailing = "Sailing"
export const multiSport = "Multi-sport"

const hikingIMG = require('../images/types/hiking.jpeg')
const safariIMG = require('../images/types/safari.jpeg')
const campingIMG = require('../images/types/camping.jpeg')
const polarIMG = require('../images/types/polar.jpeg')
const sailingIMG = require('../images/types/sailing.jpeg')
const multiSportIMG = require('../images/types/multisport.jpeg')


export const typesArray = [
    "Safari",
    "Camping",
    "Polar",
    "Sailing",
    "Multi-sport",
    "Hiking"
]

export const typesData = [
    {"name":"Hiking","link": "/search", "img": Constants.config.url.SITE_URL + hikingIMG},
    {"name":"Multi-sport","link": "/search", "img": Constants.config.url.SITE_URL + multiSportIMG},
    {"name":"Safari","link": "/search", "img": Constants.config.url.SITE_URL + safariIMG},
    {"name":"Camping","link": "/search", "img": Constants.config.url.SITE_URL + campingIMG},
    {"name":"Sailing","link": "/search", "img": Constants.config.url.SITE_URL + sailingIMG},
    {"name":"Polar","link": "/search", "img": Constants.config.url.SITE_URL + polarIMG}, 
]