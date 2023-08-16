module.exports = function makeGetUserExpense({
    expensedb,
    Joi,
    getErrorMessage,
    moment,
    ValidationError,
}) {
    return async function getUserExpense({ 
        userId,
        startDate, 
        endDate,
    }) {
        validateUserInput({ userId })
        if (startDate && endDate) {
            startDate =  moment(`${startDate} 00:00:00`).utc().format('YYYY-MM-DD HH:mm:ss');
            endDate =  moment(`${endDate} 23:59:59`).utc().format('YYYY-MM-DD HH:mm:ss');
        }
        const userExpenses = await expensedb.getUserExpense({
            userId,
            startDate,
            endDate
        })
        if (!userExpenses.length) return [];
        const cumulativeSpendAmountBySpendLimit = await expensedb.getTotalAmountAgainstSpendLimit({
            userId,
        })
        cumulativeSpendAmountBySpendLimit.forEach((spentDetails) => {
            const dataToBeUpdated = userExpenses.filter((expenses) => expenses.spend_limit_id === spentDetails.id);
            if (spentDetails.sum > spentDetails.spent_limit_amount) {
                dataToBeUpdated.forEach((data) => data['is_above_limit'] = true)
            } else {
                dataToBeUpdated.forEach((data) => data['is_above_limit'] = false)
            }
        })
        return userExpenses;
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