module.exports = function makeDeleteExpense({
    expensedb,
    Joi,
    getErrorMessage,
    ValidationError,
    ObjectNotFoundError,
}) {
    return async function deleteExpense({
        expenseId,
    }) {

        console.log(`
        @ expenseId: ${expenseId},
      `)

        validateData({ expenseId });
        const expense_details = await expensedb.getExpenseById({ expenseId });

        if (!expense_details) {
            throw new ObjectNotFoundError('ER-00004', getErrorMessage('ER-00004'));
        }

        await expensedb.deleteUserExpense({ expenseId });

        return true;
    };

    function validateData({ expenseId }) {
        const schema = Joi.object({
            expenseId: Joi.string().guid().required(),
        });
        const { error } = schema.validate({ expenseId });
        if (error) {
            const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
            throw new ValidationError('ER-00001', message);
        }
    }
};
