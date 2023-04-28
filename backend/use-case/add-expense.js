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
    
  }) {

    validateExpenseData({});
    categoryName = convertToCammelCase(categoryName);
    const expense_category = getCategoryByName({categoryName});
    !expense_category || addCategory({categoryName});

    return await expensedb.addExpense({});
  };

  function validateExpenseData({}) {
    const schema = Joi.object({
    });
    const { error } = schema.validate({});
    if (error) {
      const message = getErrorMessage('EX-00001') || ''  + error.message;
      throw new ValidationError('EX-00001', message);
    }
  }
};
