const request = async(method, url, data) => {
    try {
        const userFromLS = localStorage.getItem('authUser')
        let authUser = ''
        if(userFromLS != null) {
            authUser = JSON.parse(userFromLS)
        }
        let headers = {}

        if(authUser.accessToken){
            headers['X-Authorization'] = authUser.accessToken
        }
        
        let requestBuilder
        
        if (method === 'GET'){
            requestBuilder = fetch(url, {headers})
        }else {
            requestBuilder = fetch(url, {
                method,
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }

        const response = await requestBuilder;
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const get = request.bind({}, 'GET')
export const post = request.bind({}, 'POST')
export const put = request.bind({}, 'PUT')
export const patch = request.bind({}, 'PATCH')
export const remove = request.bind({}, 'DELETE')

