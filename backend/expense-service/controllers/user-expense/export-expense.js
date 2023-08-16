module.exports = function makeExportExpenseAction({
  exportExpense,
  formatResponse,
  formatError,
}) {
  return async function exportExpenseAction(httpRequest) {
    try {
      const userId = 'a9827099-9494-4cd4-9411-3cf8c6c37126';
      const response = await exportExpense({ userId });
      return formatResponse({
        contentType: response.contentType,
        statusCode: 200,
        body: response.file,
        headers: {
          'content-disposition': `attachment; filename="${response.fileName}"`
        }
      });
    } catch (error) {
      console.error(error);
      return formatError({ error })
    }
  }
}