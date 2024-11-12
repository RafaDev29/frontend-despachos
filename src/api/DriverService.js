import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listDriversApi(token) {
    return axios.get(`${baseURL}drivers`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export function createDriversApi(token, payload) {
    return axios.post(`${baseURL}drivers`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}