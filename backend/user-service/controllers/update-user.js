module.exports = function makeUpdateUserAction({
    updateUser,
    formatResponse,
    formatError,
}) {
    return async function updateUserAction(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const email = httpRequest.body.email;
            const name = httpRequest.body.name;
            const first_name = httpRequest.body.first_name;
            const last_name = httpRequest.body.last_name;
            const profile_photo_url = httpRequest.body.profile_photo_url;
            const password = httpRequest.body.password;

            const response = await updateUser({
                userId,
                email,
                name,
                first_name,
                last_name,
                profile_photo_url,
                password,
            });
            return formatResponse({ contentType: 'application/json', statusCode: 204, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    };
};
