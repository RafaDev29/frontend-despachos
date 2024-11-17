
import axiosInstance from "@/config/http.config"
const baseURL = process.env.VUE_APP_BASE_URL;


export function listDispatchApi(token, payload) {
    return axiosInstance.post(`${baseURL}dispatches/report`,payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}


export const createDispatchApi = (token, formData) => {
    return axiosInstance.post(`${baseURL}dispatches`,formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};


export const deleteDispatchApi = (token, payload) => {
    return axiosInstance.delete(`${baseURL}dispatches`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: payload,
    });
};

