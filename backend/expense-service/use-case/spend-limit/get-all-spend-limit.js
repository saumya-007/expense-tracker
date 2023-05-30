module.exports = function makeGetAllSpendLimit({
    expensedb,
    Joi,
    getErrorMessage,
    ValidationError,
}) {
    return async function getAllSpendLimit({ userId, fieldsToQuery }) {
        validateUserInput({ userId })
        return await expensedb.getAllSpendLimit({
            userId,
            fieldsToQuery
        })
    }

    function validateUserInput({ userId }) {
        const schema = Joi.object({
            userId: Joi.string().guid().required(),
        });
        const { error } = schema.validate({ userId });
        if (error) {
          const message = [(getErrorMessage('ER-00005') || ''), error.message].join(', ');
          throw new ValidationError('ER-00005', message);
        }
      }
}