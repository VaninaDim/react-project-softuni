import * as request from "../components/utils/requester";

const baseUrl = 'http://localhost:3030'

export const getAll = () => {
    return request.get(`${baseUrl}/data/dogs`)
}

export const getOne = (dogId) => {
    return request.get(`${baseUrl}/data/dogs/${dogId}`)
}

export const createDog = (name, age, url, description) => {
    return request.post(`${baseUrl}/data/dogs`, {name, age, url, description})
}
   
export const updateDog = (id, name, age, url, description, status) =>{
    return request.put(`${baseUrl}/data/dogs/${id}`, {name, age, url, description, status})
}
 
export const deleteDog = (id) =>{
    return request.remove(`${baseUrl}/data/dogs/${id}`)
}