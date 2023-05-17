module.exports = function makeAddExpenseAction({
  addExpense,
  formatResponse,
  formatError,
  DEAULT_SPEND_LIMIT,
}) {
  return async function addExpenseAction(httpRequest) {
    try {
      const activity = httpRequest.body.activity;
      const spendLimit = httpRequest.body.spend_limit ? httpRequest.body.spend_limit : DEAULT_SPEND_LIMIT;
      const amount = httpRequest.body.amount;
      const categoryName = httpRequest.body.category_name;
      const spentOn = httpRequest.body.spent_on;

      // take from access token after auth service implementation
      const userId = '00000000-0000-0000-0000-000000000000';
      const response = await addExpense({activity, spendLimit, amount, categoryName, userId, spentOn});
      return formatResponse({ contentType: 'application/json', statusCode: 200 , body: { item: response }});
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};
