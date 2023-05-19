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
            if (error && error.response && error.response.data && error.response.data.Error) {
                const message = getErrorMessage('EX-00002') || '' + error.message;
                throw new AuthenticationFailed('EX-00002', message);
            }
            throw error;
        });
    }
}