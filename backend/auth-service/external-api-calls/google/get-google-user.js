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
            if (error && error.response && error.response.data && error.response.data.Error) {
                const message = getErrorMessage('EX-00006') || '' + error.message;
                throw new AuthenticationFailed('EX-00006', message);
            }
            throw error;
        });
    }
}