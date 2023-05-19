module.exports = function makeGetGoogleAccessToken({
    axios,
    AuthenticationFailed,
    getErrorMessage,
}) {
    return async function getGoogleAccessToken({ url, options }) {
        return axios({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: options,
        }).then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error);
            if (error && error.response && error.response.data && error.response.data.message) {
                const message = [(getErrorMessage('ER-00002') || ''), error.response.data.message].join(', ');
                throw new AuthenticationFailed('ER-00002', message);
            }
            throw error;
        });
    }
}