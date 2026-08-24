import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data
    } catch (error) {
        throw Error(error.response.data.message)
    }
}


export async function login({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}

export async function logout() {
    try{
        await api.get('/api/auth/logout')
    }catch(error){
        console.log(error)
    }
}

export async function getMe() {
    
    try{
        const response = await api.get('/api/auth/get-me')
        return response.data
    }catch(error){
        console.log(error)
    }
}