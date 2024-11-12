import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listDispatchApi(token) {
    return axios.get(`${baseURL}dispatches`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}