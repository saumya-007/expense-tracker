module.exports = function makeGetGoogleOauthToken({
    axios,
    AuthenticationFailed
}) {
    return async function getGoogleOauthToken(url, query) {
        return axios({
            method: 'get',
            query,
            url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error);
            if (error && error.response && error.response.data && error.response.data.Error) {
                const message = getErrorMessage('EX-00005') || '' + error.message;
                throw new AuthenticationFailed('EX-00005', message);
            }
            throw error;
        });
    }
}