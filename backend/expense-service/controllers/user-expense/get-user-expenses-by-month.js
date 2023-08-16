module.exports = function makeGetUserExpensesByMonthAction({
    getUserExpenseByMonth,
    formatResponse,
    formatError,
}) {
    return async function getUserExpenseAction(httpRequest) {
        try {
            // take from access token after auth service implementation
            const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
            const response = await getUserExpenseByMonth({ 
                userId,
                month: httpRequest.query.month,
                year: httpRequest.query.year,
             });
            return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    }
}