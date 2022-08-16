import * as request from "../components/utils/requester";

const baseUrl = 'http://localhost:3030'

export const getAll = () => {
    return request.get(`${baseUrl}/data/dogs`)
}


export const createDog = (name, age, url, description) => {
    return request.post(`${baseUrl}/data/dogs`, {name, age, url, description})
}
    