module.exports = function makeGetUserExpense({
    getUserExpense,
    formatResponse,
    formatError,
}) {
    return async function getUserExpenseAction() {
        try {
            // take from access token after auth service implementation
            const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
            const response = await getUserExpense({ userId });
            return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    }
}
