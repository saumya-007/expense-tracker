module.exports = function makeAddUser({
    config,
    axios,
    UnknownError,
    getErrorMessage,
}) {
    return function addUser({
        email,
        name,
        first_name,
        last_name,
        profile_photo_url,
    }) {
        return axios({
            method: 'post',
            url: `${config.serviceEndpoints.userService}/v1/add-user`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email,
                name,
                first_name,
                last_name,
                profile_photo_url,
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error);
            if (error && error.response && error.response.data && error.response.data.Error) {
                const message = getErrorMessage('EX-00007') || '' + error.message;
                throw new UnknownError('EX-00007', message);
            }
            throw error;
        });
    }
}