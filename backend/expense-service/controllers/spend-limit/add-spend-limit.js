module.exports = function makeAddSpendLimitAction({
  addSpendLimit,
  formatResponse,
  formatError,
}) {
  return async function addSpendLimitAction(httpRequest) {
    try {
      const spendLimit = httpRequest.body.spend_limit;
      const startDate = httpRequest.body.start_date;
      const endDate = httpRequest.body.end_date;

      // take from access token after auth service implementation
      const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
      const response = await addSpendLimit({ spendLimit, startDate, endDate, userId });
      return formatResponse({ contentType: 'application/json', statusCode: 201, body: { item: response } });
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};
