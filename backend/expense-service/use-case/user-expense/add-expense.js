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
    amount,
    userId,
    categoryName,
    spentOn,
  }) {

    console.log(`
      @ activity: ${activity},
      @ amount: ${amount},
      @ userId: ${userId},
      @ categoryName: ${categoryName},
      @ spentOn: ${spentOn}
    `)

    validateExpenseData({
      activity,
      amount,
      userId,
      categoryName,
      spentOn,
    });

    const spendLimitDetails = await expensedb.getSpendLimitForSpentOn({ spentOn, fieldsToQuery:['id', 'spend_limit'] });

    if (!spendLimitDetails) {
      throw new ValidationError('ER-00012', getErrorMessage('ER-00012'));
    }

    activity = capitalizeFirstLetters({ str: activity, withSpace: true, skipFirst: false })
    let categoryId;
    categoryName = capitalizeFirstLetters({ str: categoryName, withSpace: true, skipFirst: false });
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
    console.log(spendLimitDetails);
    return await expensedb.addExpense({
      activity,
      categoryId,
      amount,
      isAboveLimit: parseFloat(amount) > parseFloat(spendLimitDetails['spend_limit']),
      userId,
      spentOn,
      spendLimit: spendLimitDetails['id'],
    });

    /**
     * TO DO - add code to delete added category if some how add fails
     */
  };

  function validateExpenseData({
    activity,
    amount,
    userId,
    categoryName,
    spentOn,
  }) {
    const schema = Joi.object({
      activity: Joi.string().required(),
      amount: Joi.number().required(),
      userId: Joi.string().guid().required(),
      categoryName: Joi.string().required(),
      spentOn: Joi.date().max(new Date())
    });
    const { error } = schema.validate({
      activity,
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
