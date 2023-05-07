module.exports = function makeAddExpense({
  expensedb,
  Joi,
  getErrorMessage,
  addCategory,
  convertToCammelCase,
  ValidationError,
  AlreadyExistsError,
}) {
  return async function addExpense({
    activity,
    spendLimit,
    amount,
    userId,
  }) {

    validateExpenseData({
      activity,
      spendLimit,
      amount,
      userId,
    });
    categoryName = convertToCammelCase(categoryName);
    const expense_category = getCategoryByName({categoryName});
    !expense_category || addCategory({categoryName});
    console.log(!expense_category);
    // return await expensedb.addExpense({});
    return true;
  };

  function validateExpenseData({
    activity,
    spendLimit,
    amount,
    userId,
  }) {
    const schema = Joi.object({
      activity,
      spendLimit,
      amount,
      userId,
    });
    const { error } = schema.validate({
      activity,
      spendLimit,
      amount,
      userId,
    });
    if (error) {
      const message = getErrorMessage('EX-00001') || ''  + error.message;
      throw new ValidationError('EX-00001', message);
    }
  }
};
