module.exports = function makeDeleteUserExpenseAction({
    deleteUserExpense,
    formatResponse,
    formatError,
}) {
    return async function deleteUserExpenseAction(httpRequest) {
        try {
            const expenseId = httpRequest.params.expenseId;

            const response = await deleteUserExpense({ expenseId });
            return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    };
};
