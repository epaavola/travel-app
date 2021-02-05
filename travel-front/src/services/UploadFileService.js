import axios from 'axios'
import { config } from  '../constants/Constants'

/**
 * File service connects to the backend REST API
 * to handle upload / get files.
 * Service methods:
 *  uploadFile: POST {file} -> return OK
 *  getAllFiles: GET -> return all files 
 *  getFileByID: GET {id} -> return one file
 */

const FILE_API_URL = config.url.FILE_API_URL

// GET - Return llist of all Files from database
const getAllFiles = async () => {
    const response = await axios.get(FILE_API_URL)
    return response
}

// GET - Return File by ID from database
const getFileByID = async (id) => {
    const response = await axios.get(FILE_API_URL + id)
    return response
}

// DELETE - Delete File by ID from database
const deleteFileByID = async (accessToken, id) => {
    const options = { headers: {
            'Authorization': `Bearer ${accessToken}`
        }, withCredentials: true
    }
    const response = await axios.delete(FILE_API_URL + id, options)
    return response
}

// POST - Save new File to the database
const uploadFile = async (accessToken, file, fileName) => {
    const data = new FormData() 
    data.append('file', file)
    data.append('filename', fileName)
    const options = { 
        headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data' 
        }, withCredentials: true 
    }
    const response = await axios.post(FILE_API_URL + 'upload', data, options)
    return response
}

export { getAllFiles, getFileByID, deleteFileByID, uploadFile }