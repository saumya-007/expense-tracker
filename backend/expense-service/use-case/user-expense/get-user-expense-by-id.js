module.exports = function makeGetUserExpenseById({
  expensedb,
  Joi,
  getErrorMessage,
  ValidationError,
}) {
  return async function getUserExpenseById({ userId, expenseId }) {
    console.log(expenseId);
      validateUserInput({ userId, expenseId })
      const useExpenses = await expensedb.getExpenseById({
          userId,
          expenseId,
      });
      if (!useExpenses['category_id']) {
        return useExpenses;
      }
      const categoryDetails = await expensedb.getCategoryById({
        categoryId: useExpenses['category_id']
    });

    return {...useExpenses, category_name: categoryDetails['category_name']};
  }

  function validateUserInput({ userId, expenseId }) {
      const schema = Joi.object({
          userId: Joi.string().guid().required(),
          expenseId: Joi.string().guid().required(),
      });
      const { error } = schema.validate({ userId, expenseId });
      if (error) {
        const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
        throw new ValidationError('ER-00001', message);
      }
    }
}