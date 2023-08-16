module.exports = function makeExportExpense({
  Joi,
  config,
  getUserExpense,
  getErrorMessage,
  ValidationError,
  ObjectNotFoundError,
}) {
  return async function exportExpense({ userId }) {
    validateUserInput({ userId });
    const expenseDetails = await getUserExpense({ userId });
    console.log(expenseDetails);
    if (!expenseDetails?.length) {
      throw new ObjectNotFoundError('ER-00004', [(getErrorMessage('ER-00004') || ''), error.message].join(', '));
    }
    const parsedData = makeCsvData({ data: expenseDetails });
    return {
      contentType: config.csvFileContentType,
      file: parsedData,
      fileName: `user-expenses.csv`,
    };
  }

  function validateUserInput({ userId }) {
    const schema = Joi.object({
      userId: Joi.string().guid().required(),
    });
    const { error } = schema.validate({ userId });
    if (error) {
      const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
      throw new ValidationError('ER-00001', message);
    }
  }

  function makeCsvData({data}) {
    let str = '';
    delete data[0]['id'];
    str += Object.keys(data[0]) + '\n' + data.map((dataValue) => {
      const returnArray = Object.values(dataValue)
      returnArray.push('\n')
      return `${returnArray}`;
    }).flat();
    return Buffer.from(`${str}`);
  }
}