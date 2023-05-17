module.exports = function makeImportExpensesAction({
  importExpense,
  formatResponse,
  formatError,
  fileHandler,
}) {
  return async function importExpensesAction(httpRequest) {
    try {
      const file = httpRequest.file;
      const userId = '00000000-0000-0000-0000-000000000000';
      const response = await importExpense({ file, userId });
      return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};
