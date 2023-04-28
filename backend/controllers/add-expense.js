module.exports = function makeAddExpenseAction({
  addExpense,
  formatResponse,
  formatError,
}) {
  return async function addExpenseAction(httpRequest) {
    try {
      const response = await addExpense({});
      return formatResponse({ contentType: 'application/json', statusCode: 200,response: { item: response }});
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};
