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
            return response.data.item
        }).catch((error) => {
            if (error && error.response && error.response.data && error.response.data.message) {
                const message = [(getErrorMessage('ER-00004') || ''), error.response.data.message].join(', ');
                throw new UnknownError('ER-00004', message);
            }
            throw error;
        });
    }
}