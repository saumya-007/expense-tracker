module.exports = function makeGetUserByEmailAction({
    getUserByEmail,
    formatResponse,
    formatError,
}) {
    return async function getUserByEmailAction(httpRequest) {
        try {
            const email = httpRequest.params.email;
            const isAuthServiceCall = httpRequest.query.isAuthServiceCall ? httpRequest.query.isAuthServiceCall : false;
            const response = await getUserByEmail({ email, isAuthServiceCall });
            return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    }
}