module.exports = function makeAddExpense({
  expensedb,
  Joi,
  getErrorMessage,
  addCategory,
  capitalizeFirstLetters,
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
    spentOn,
  }) {

    console.log(`
      @ activity: ${activity},
      @ spendLimit: ${spendLimit},
      @ amount: ${amount},
      @ userId: ${userId},
      @ categoryName: ${categoryName},
      @ spentOn: ${spentOn}
    `)

    validateExpenseData({
      activity,
      spendLimit,
      amount,
      userId,
      categoryName,
      spentOn,
    });

    let categoryId;
    categoryName = capitalizeFirstLetters({ str: categoryName, withSpace: false, skipFirst: false });
    const expenseCategory = await getCategoryByName({ categoryName });
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
    return await expensedb.addExpense({
      activity,
      categoryId,
      amount,
      isAboveLimit: parseFloat(amount) > parseFloat(spendLimit),
      userId,
      spentOn,
      spendLimit,
    });

    /**
     * TO DO - add code to delete added category if some how add fails
     */
  };

  function validateExpenseData({
    activity,
    spendLimit,
    amount,
    userId,
    categoryName,
    spentOn,
  }) {
    const schema = Joi.object({
      activity: Joi.string().required(),
      spendLimit: Joi.number().required(),
      amount: Joi.number().required(),
      userId: Joi.string().guid().required(),
      categoryName: Joi.string().required(),
      spentOn: Joi.date().max(new Date())
    });
    const { error } = schema.validate({
      activity,
      spendLimit,
      amount,
      userId,
      categoryName,
      spentOn,
    });
    if (error) {
      const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
      throw new ValidationError('ER-00001', message);
    }
  }
};
