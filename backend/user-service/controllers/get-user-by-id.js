module.exports = function makeGetUserByIdACtion({
    getUserById,
    formatResponse,
    formatError,
}) {
    return async function getUserByIdAction(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const response = await getUserById({ userId });
            return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    }
}