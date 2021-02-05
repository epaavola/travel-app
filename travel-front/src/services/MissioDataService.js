import axios from 'axios'
import { config } from '../constants/Constants'

/**
 * MissioDataService.
 * CRUD Methods for Missions API.
 * Service calls backend REST API to manage missions in database.
 *  * Service methods:
 *  getMissions: GET {} -> return all missions
 *  getMissions: GET {organization} -> return all missions by organization
 *  getMissioByID: GET {id} -> return missio by id
 *  deleteMissioByID: DELETE {id} -> delete Missio by ID
 *  createMissio: POST {missio} -> create new Missio
 *  createMissio: PUT {missio} -> edit Missio by id
 */


 const API_URL = config.url.MISSIONS_API_URL
 const FILE_API_URL = config.url.FILE_API_URL

// GET - Return all Missions from database
const getMissions = async (organization, pageCount, pageSize) => {
    if(organization.localeCompare("All") === 0) organization = null
    const options = { withCredentials: true }
    const response = await axios.get(API_URL + "all", {params: {organization: organization, page: pageCount, size: pageSize}}, options)
    return response
}

// GET - Return Missio by ID from database
const getMissioByID = async (id) => {
    const response = await axios.get(API_URL + id)
    return response
}

// DELETE - Delete Missio by ID from database
const deleteMissioByID = async (accessToken, id) => {
    const options = { headers: { 'Authorization': `Bearer ${accessToken}` }, withCredentials: true }
    const response = await axios.delete(API_URL + id, options)
    return response
}

// POST - Save new Missio to the database
const createMissio = async (accessToken, missioName, passions, skills,
    organization, active, type, trainingLocation,outreachLocation,
    startDate, endDate, length, price, applyDateStart,
    applyDateEnd, description, longDescription, website, imageURL) => {

    const options = { headers: { 'Authorization': `Bearer ${accessToken}` }, withCredentials: true }
    const response = await axios.post(
        API_URL, { 
            name: missioName,
            passions: passions,
            skills: skills,
            organization: organization,
            active: active,
            type: type,
            trainingLocation: trainingLocation,
            outreachLocation: outreachLocation,
            startDate: startDate,
            endDate: endDate,
            length: length,
            price: price,
            applyDateStart: applyDateStart,
            applyDateEnd: applyDateEnd,
            description: description,
            longDescription: longDescription,
            website: website,
            imageURL: FILE_API_URL + imageURL
        },
        options)
    return response
}

// PUT - Edit existing Missio on the database
const editMissio = async (accessToken, id, missioName, passions, skills,
    organization, active, type, trainingLocation,outreachLocation,
    startDate, endDate, length, price, applyDateStart,
    applyDateEnd, description, longDescription, website, imageURL) => {

    const options = { headers: { 'Authorization': `Bearer ${accessToken}` }, withCredentials: true }
    const response = await axios.put(
        API_URL + id, { 
            name: missioName,
            passions: passions,
            skills: skills,
            organization: organization,
            active: active,
            type: type,
            trainingLocation: trainingLocation,
            outreachLocation: outreachLocation,
            startDate: startDate,
            endDate: endDate,
            length: length,
            price: price,
            applyDateStart: applyDateStart,
            applyDateEnd: applyDateEnd,
            description: description,
            longDescription: longDescription,
            website: website,
            imageURL: imageURL
        },
        options)
    return response
}

export { getMissions, createMissio, editMissio, getMissioByID, deleteMissioByID }