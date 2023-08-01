module.exports = function makeImportExpensesAction({
  importExpense,
  formatResponse,
  formatError,
  fileHandler,
}) {
  return async function importExpensesAction(httpRequest) {
    try {
      const file = httpRequest.file;
      const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
      const response = await importExpense({ file, userId });
      return formatResponse({ contentType: 'application/json', statusCode: 201, body: { item: response } });
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};
