module.exports = function makeGetGoogleUser({
    axios,
    AuthenticationFailed,
    getErrorMessage,
}) {
    return async function getGoogleUser({ id_token, url, options }) {
        return axios({
            method: 'get',
            url,
            headers: {
                Authorization: `Bearer ${id_token}`
            },
            params: options,
        }).then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error);
            if (error && error.response && error.response.data && error.response.data.message) {
                const message = [(getErrorMessage('ER-00003') || ''), error.response.data.message].join(', ');
                throw new AuthenticationFailed('ER-00003', message);
            }
            throw error;
        });
    }
}