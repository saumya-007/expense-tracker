module.exports = function makeUpdateSpendLimitAction({
    updateSpendLimit,
    formatResponse,
    formatError,
}) {
    return async function updateSpendLimitAction(httpRequest) {
        try {
            const spendLimitId = httpRequest.params.spendLimitId;
            const spendLimit = httpRequest.body.spend_limit;
            const startDate = httpRequest.body.start_date;
            const endDate = httpRequest.body.end_date;
            const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
            const response = await updateSpendLimit({
                userId,
                spendLimitId,
                spendLimit,
                startDate,
                endDate,
            });
            return formatResponse({ contentType: 'application/json', statusCode: 204, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    };
};
