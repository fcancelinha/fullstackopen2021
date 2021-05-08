import { useState } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])


    const get = async () => {
        try {
            const response = await axios.get(baseUrl)
            setResources(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const create = async (resource) => {

        try {
            const response = await axios.post(baseUrl, resource)
            setResources([...resources, response.data])

        } catch (error) {
            console.log(error)
        }
    }

    const service = {
        get,
        create,
    }

    return [
        resources, service
    ]

}

export default useResource
