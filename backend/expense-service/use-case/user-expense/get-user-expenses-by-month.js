module.exports = function makeGetUserExpensesByMonth({
  getUserExpenseByDate,
  Joi,
  getErrorMessage,
  moment,
  ValidationError,
  MONTHS,
}) {
  return async function getUserExpensesByMonth({
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

    const allAvailableExpenses = await getUserExpenseByDate({
      userId,
      startDate,
      endDate,
    })

    const sampleResponse = getWeeksNetweenDays({
      startDate: moment(startDate).startOf('isoweek').format('YYYY-MM-DD'), 
      endDate: moment(endDate).endOf('isoweek').format('YYYY-MM-DD')
    })

    Object.values(sampleResponse).forEach((sampleResponseExpense) => {
      sampleResponseExpense.dates.forEach((item) => {
        const dataOfExpense = allAvailableExpenses.find(expense => moment(expense.spent_on).isSame(item))
        if (dataOfExpense) {
          sampleResponseExpense.data.push(dataOfExpense.amount)
        } else {
          sampleResponseExpense.data.push(0)
        }
      })
    })

    return sampleResponse;

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

  function getWeeksNetweenDays({ startDate, endDate }) {
    const startOfWeekMonth = moment(startDate).startOf('isoweek').format('YYYY-MM-DD');
    const endOfWeekMonth = moment(endDate).endOf('isoweek').format('YYYY-MM-DD');

    const dateObj = {};
    let weekCount = 1;
    let start = startOfWeekMonth;
    while(moment(start).isSameOrBefore(endOfWeekMonth)) {
      let end = moment(start).add(7, 'days').format('YYYY-MM-DD');
      dateObj[`Week ${weekCount}`] = {
        dates: getDaysBetweenDates({startDate: start, endDate: end}),
        data: []
      }
      ++weekCount;
      start = end;
    } 
    return dateObj   
  }

  function getDaysBetweenDates({startDate, endDate}) {
    const dates = [];
    const startDateClone = moment(startDate);
    while (moment(startDateClone).isBefore(endDate)) {
      dates.push(startDateClone.format('YYYY-MM-DD'));
      startDateClone.add(1, 'days');
    }
    return dates;
  }
}