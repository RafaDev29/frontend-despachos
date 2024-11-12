import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listRoutesApi(token) {
    return axios.get(`${baseURL}routes`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}