module.exports = function makeGetUserExpenseByDate({
  expensedb,
  Joi,
  getErrorMessage,
  moment,
  ValidationError,
}) {
  return async function getUserExpenseByDate({
    userId,
    startDate,
    endDate,
  }) {
    validateUserInput({ userId })
    if (startDate && endDate) {
      startDate = moment(`${startDate} 00:00:00`).utc().format('YYYY-MM-DD HH:mm:ss');
      endDate = moment(`${endDate} 23:59:59`).utc().format('YYYY-MM-DD HH:mm:ss');
    }
    const expenseDate = await expensedb.getUserExpense({
      userId,
      startDate,
      endDate,
      fieldsToQuery: [
        'category_name',
        'amount',
        'spent_on',
        'spend_limit'
      ],
    })
    const customResponse = [];
    const dates = [];
    expenseDate.forEach((item) => {
      const formatedDate = moment(item.spent_on).format('YYYY-MM-DD');
      if (dates.includes(formatedDate)) {
        const index = customResponse.findIndex(expense => moment(moment(expense.spent_on).format('YYYY-MM-DD')).isSame(formatedDate))
        const expenseDetails = customResponse[index];
        const updatedExpenseDetails = {
          is_above_limit: expenseDetails.is_above_limit,
          spent_on: expenseDetails.spent_on,
          spend_limit: expenseDetails.spend_limit,
          spend_limit_id: expenseDetails.spend_limit_id,
          category_name: expenseDetails.category_name,
          amount: Number(expenseDetails['amount']) + Number(item['amount'])
        };
        customResponse.splice(index, 1, updatedExpenseDetails)
      } else {
        customResponse.push({ ...item, spent_on: formatedDate, amount: Number(item['amount'])});
        dates.push(formatedDate);
      }
    });
    return customResponse;
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