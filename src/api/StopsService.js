
import axiosInstance from "@/config/http.config"
const baseURL = process.env.VUE_APP_BASE_URL;


export function listStopsApi(token) {
    return axiosInstance.get(`${baseURL}stops`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export function createStopsApi(token, payload) {
    return axiosInstance.post(`${baseURL}stops`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export function deleteStopsApi(token, payload) {
   
    return axiosInstance.delete(`${baseURL}stops`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: payload,
        }
    )
}


export function updateStopsApi(token, payload) {
   
    return axiosInstance.post(`${baseURL}stops/update`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
         
        }
    )
}