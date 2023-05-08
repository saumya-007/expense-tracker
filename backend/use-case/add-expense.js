module.exports = function makeAddExpense({
  expensedb,
  Joi,
  getErrorMessage,
  addCategory,
  convertToCammelCase,
  getCategoryByName,
  ValidationError,
  AlreadyExistsError,
}) {
  return async function addExpense({
    activity,
    spendLimit,
    amount,
    userId,
    categoryName,
  }) {

    console.log(`
      @ activity: ${activity},
      @ spendLimit: ${spendLimit},
      @ amount: ${amount},
      @ userId: ${userId},
      @ categoryName: ${categoryName},
    `)

    validateExpenseData({
      activity,
      spendLimit,
      amount,
      userId,
      categoryName,
    });

    let categoryId;
    categoryName = convertToCammelCase(categoryName);
    console.log(categoryName);
    const expenseCategory = await getCategoryByName({categoryName});
    console.log(expenseCategory);
    if (!expenseCategory) {
        const newExpenseCategory = await addCategory({
        categoryName,
        userId
      });
      categoryId = newExpenseCategory['id'];
    }
    else {
      categoryId = expenseCategory['id'];
    }
    console.log(parseFloat(amount) > parseFloat(spendLimit));
    return await expensedb.addExpense({
      activity,
      categoryId,
      amount,
      isAboveLimit: parseFloat(amount) > parseFloat(spendLimit),
      userId,
    });
    return true;
  };

  function validateExpenseData({
    activity,
    spendLimit,
    amount,
    userId,
    categoryName,
  }) {
    const schema = Joi.object({
      activity: Joi.string().required(),
      spendLimit: Joi.number().required(),
      amount: Joi.number().required(),
      userId: Joi.string().guid().required(),
      categoryName: Joi.string().required(),
    });
    const { error } = schema.validate({
      activity,
      spendLimit,
      amount,
      userId,
      categoryName,
    });
    if (error) {
      const message = getErrorMessage('EX-00001') || ''  + error.message;
      throw new ValidationError('EX-00001', message);
    }
  }
};
