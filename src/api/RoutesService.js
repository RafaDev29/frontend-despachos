

import axiosInstance from "@/config/http.config"
const baseURL = process.env.VUE_APP_BASE_URL;


export function listRoutesApi(token) {
    return axiosInstance.get(`${baseURL}routes`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}


export function createRoutesApi(token, payload) {
    return axiosInstance.post(`${baseURL}routes`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export function deleteRoutesApi(token, payload) {
   
    return axiosInstance.delete(`${baseURL}routes`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: payload,
        }
    )
}