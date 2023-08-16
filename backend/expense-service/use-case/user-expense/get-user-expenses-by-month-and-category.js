module.exports = function makeGetUserExpensesByMonthAndCategory({
  expensedb,
  Joi,
  getErrorMessage,
  moment,
  ValidationError,
  MONTHS
}) {
  return async function makeGetUserExpensesByMonthAndCategory({
    userId,
    month,
    year,
  }) {
    validateUserInput({
      userId,
      month,
      year,
    })

    month = Number(month);
    year = Number(year);

    const startDate = ~month && year ? moment(`${year}-${month+1}-01`).format('YYYY-MM-DD') : moment().startOf('month').format('YYYY-MM-DD');
    const startDateClone = moment(startDate).clone();
    const endDate = moment(startDateClone).endOf('month').format('YYYY-MM-DD');

    const allExpensesByCategory = await expensedb.getUserExpenseByCategory({
      userId,
      startDate,
      endDate,
    })

    const allcategories = await expensedb.getAllCategories({
      userId,
      startDate,
      endDate,
    });
    
    return {
      categories: allcategories,
      data: refactoreDataAsPerCategories({data: allExpensesByCategory, categories: allcategories})
    };

  }

  function refactoreDataAsPerCategories({data, categories}) {
    // const response = {};
    // data.forEach(item => {
    //   const matchedData = item.find((element) => categories.includes(element.category_name))
    //   if (matchedData) {
    //     response
    //   }
    // })
    return data;
  }

  function validateUserInput({
    userId,
    month,
    year,
  }) {
    const schema = Joi.object({
      userId: Joi.string().guid(),
      month: Joi.number(),
      year: Joi.number(),

    });
    const { error } = schema.validate({ userId, month, year });
    if (error) {
      const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
      throw new ValidationError('ER-00001', message);
    }
    if (month && year) {
      if (!isValidMonth({ month })) {
        const message = [(getErrorMessage('ER-00015') || '')].join(', ');
        throw new ValidationError('ER-00015', message);
      }
      if (!isValidYear({ year })) {
        const message = [(getErrorMessage('ER-00016') || '')].join(', ');
        throw new ValidationError('ER-00016', message);
      }
    }
  }

  function isValidMonth({ month }) {
    return Number(month) <= 11 && Number(month) >= 0
  }

  function isValidYear({ year }) {
    return new Date().getFullYear() >= year;
  }
}