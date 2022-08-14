import { request } from "../components/utils/requester";

const baseUrl = 'http://localhost:3030'

export const getAll = () => {
    return request(`${baseUrl}/data/games`)
}