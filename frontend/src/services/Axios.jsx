import axios from "axios";
export default class Axios {
    constructor() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.withCredentials = true;
    }
    async postAPI(url, data) {
        const formData = new FormData()
        formData.append('file', data)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
        try {
            const response = await axios.post(url, formData, config)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

}

export const apiCall = new Axios() 