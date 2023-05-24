import axios from "axios";

async function axiosCall({ url, method, data }) {
    try {
        const response = await axios({
            method,
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            data,
        })
        return {
            status: 'success',
            data: response.data,
        }
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.message) {
            return {
                status: 'error',
                data: error.response.data.message,
            }
        }
        return {
            status: 'error',
            data: 'API error',
        }
    }
}

export default axiosCall;