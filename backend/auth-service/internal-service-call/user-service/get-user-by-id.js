module.exports = function makeGetUserById({
    config,
    axios,
    UnknownError,
    getErrorMessage,
}) {
    return function getUserById({
        userId
    }) {
        return axios({
            method: 'get',
            url: `${config.serviceEndpoints.userService}/v1/get-user-by-id/${userId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            if (error && error.response && error.response.data && error.response.data.message) {
                const message = [(getErrorMessage('ER-00008') || ''), error.response.data.message].join(', ');
                throw new UnknownError('ER-00008', message);
            }
            throw error;
        });
    }
}