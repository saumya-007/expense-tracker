module.exports = function makeGetAllSpendLimitAction({
    getAllSpendLimit,
    formatResponse,
    formatError,
}) {
    return async function getAllSpendLimitAction() {
        try {
            // take from access token after auth service implementation
            const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
            const response = await getAllSpendLimit({ userId });
            return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    }
}
