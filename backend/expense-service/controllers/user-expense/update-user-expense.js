module.exports = function makeUpdateUserExpenseAction({
    updateUserExpense,
    formatResponse,
    formatError,
}) {
    return async function updateUserExpenseAction(httpRequest) {
        try {
            const expenseId = httpRequest.params.expenseId;
            const activity = httpRequest.body.activity;
            const amount = httpRequest.body.amount;
            const categoryName = httpRequest.body.category_name;
            const spentOn = httpRequest.body.spent_on;
            const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
            const response = await updateUserExpense({
                userId,
                expenseId,
                activity,
                amount,
                categoryName,
                spentOn
            });
            return formatResponse({ contentType: 'application/json', statusCode: 204, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    };
};
