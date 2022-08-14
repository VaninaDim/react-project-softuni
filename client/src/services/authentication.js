import * as request from "../components/utils/requester"
const baseUrl = 'http://localhost:3030'

export const login = (email, password) => request.post(`${baseUrl}/users/login`,{email, password})

export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/users/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        })
    } catch (error) {
        console.log(error)
    }
}
    