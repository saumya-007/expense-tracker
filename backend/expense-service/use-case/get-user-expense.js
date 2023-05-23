module.exports = function makeGetUserExpense({
    expensedb,
    Joi,
    getErrorMessage,
    ValidationError,
}) {
    return async function getUserExpense({ userId }) {
        validateUserInput({ userId })
        return await expensedb.getUserExpense({
            userId,
        })
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
}