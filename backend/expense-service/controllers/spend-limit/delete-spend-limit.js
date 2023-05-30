module.exports = function makeDeleteSpendLimit({
    deleteSpendLimit,
    formatResponse,
    formatError,
}) {
    return async function deleteSpendLimitAction(httpRequest) {
        try {
            const spendLimitId = httpRequest.params.spendLimitId;
            const response = await deleteSpendLimit({ spendLimitId });
            return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    };
};
