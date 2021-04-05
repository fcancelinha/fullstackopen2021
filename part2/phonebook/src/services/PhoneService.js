/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'api/persons'


const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (resource) => {
    return axios.post(baseUrl, resource).then(response => response.data)
}

const update = (resourceID, resource) => {
    return axios.put(`${baseUrl}/${resourceID}`, resource).then(response => response.data)
}

const erase = (resourceID) => {
    return axios.delete(`${baseUrl}/${resourceID}`).then(response => response)
}



export default {
    getAll,
    create,
    update,
    erase
}