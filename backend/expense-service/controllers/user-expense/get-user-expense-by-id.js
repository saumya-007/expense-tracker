module.exports = function makeGetUserExpenseByIdAction({
  getUserExpenseById,
  formatResponse,
  formatError,
}) {
  return async function getUserExpenseByIdAction(httpRequest) {
      try {
          // take from access token after auth service implementation
          const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
          const expenseId = httpRequest.params.expenseId;
          const response = await getUserExpenseById({ userId, expenseId });
          return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
      } catch (error) {
          console.error(error);
          return formatError({ error });
      }
  }
}
