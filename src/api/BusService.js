import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listBusesApi(token) {
    return axios.get(`${baseURL}buses`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}