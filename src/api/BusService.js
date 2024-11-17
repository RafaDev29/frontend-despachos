//import axios from 'axios';
import axiosInstance from '@/config/http.config'
const baseURL = process.env.VUE_APP_BASE_URL;


export function listBusesApi(token) {
    return axiosInstance.get(`${baseURL}buses`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}