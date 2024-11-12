import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listStopsApi(token) {
    return axios.get(`${baseURL}stops`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export function createStopsApi(token, payload) {
    return axios.post(`${baseURL}stops`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}