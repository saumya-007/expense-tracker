module.exports = function makeAddCategory({
  expensedb,
  Joi,
  getErrorMessage,
  getCategoryByName,
  capitalizeFirstLetters,
  ValidationError,
  AlreadyExistsError,
}) {
  return async function addCategory({
    categoryName,
    userId,
  }) {

    console.log(`
      @ userId: ${userId},
      @ categoryName: ${categoryName},
    `)

    validateCategoryData({ categoryName });
    categoryName = capitalizeFirstLetters({ str: categoryName, withSpace: false, skipFirst: false });
    const expense_category = await getCategoryByName({ categoryName });

    if (expense_category) {
      throw new AlreadyExistsError('ER-00002', getErrorMessage('ER-00002'));
    }

    return await expensedb.addCategory({
      categoryName,
      userId,
    });
  };

  function validateCategoryData({ categoryName }) {
    const schema = Joi.object({
      categoryName: Joi.string().required(),
    });
    const { error } = schema.validate({ categoryName });
    if (error) {
      const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
      throw new ValidationError('ER-00001', message);
    }
  }
};
