import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listDispatchApi(token, payload) {
    return axios.post(`${baseURL}dispatches/report`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}


export const createDispatchApi = (token, formData) => {
    return axios.post(`${baseURL}dispatches`,formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};
