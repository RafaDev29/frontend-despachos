

import axiosInstance from "@/config/http.config"
const baseURL = process.env.VUE_APP_BASE_URL;


export function listDriversApi(token) {
    return axiosInstance.get(`${baseURL}drivers`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export function createDriversApi(token, payload) {
    return axiosInstance.post(`${baseURL}drivers`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export function updateDriversApi(token, payload) {
    return axiosInstance.post(`${baseURL}drivers/update`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}


