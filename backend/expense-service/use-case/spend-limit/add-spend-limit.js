module.exports = function makeAddSpendLimit({
    expensedb,
    Joi,
    getErrorMessage,
    getAllSpendLimit,
    ValidationError,
}) {
    return async function addSpendLimit({ spendLimit, startDate, endDate, userId }) {

        console.log(`
        @ spendLimit: ${spendLimit},
        @ startDate: ${startDate},
        @ endDate: ${endDate},
        @ userId: ${userId},
      `)

        validateData({ spendLimit, startDate, endDate, userId });

        if (startDate > endDate) {
            throw new ValidationError('ER-00009', getErrorMessage('ER-00009'));
        }

        const dateRanges = await getAllSpendLimit({ userId, fieldsToQuery: ['start_date', 'end_date'] });
        if (dateRanges
            .map((range) => isDateRangeValid({
                startDate: new Date(startDate).getTime(),
                endDate: new Date(endDate).getTime(),
                startDateDb: new Date(range['start_date']).getTime(),
                endDateDb: new Date(range['end_date']).getTime()
            }))
            .includes(false)) {
            throw new ValidationError('ER-00010', getErrorMessage('ER-00010'));
        }

        return await expensedb.addSpendLimit({ spendLimit, startDate, endDate, userId });
    };

    function validateData({ spendLimit, startDate, endDate, userId }) {
        const schema = Joi.object({
            spendLimit: Joi.number().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            userId: Joi.string().guid().required(),
        });
        const { error } = schema.validate({ spendLimit, startDate, endDate, userId });
        if (error) {
            const message = [(getErrorMessage('ER-00008') || ''), error.message].join(', ');
            throw new ValidationError('ER-00008', message);
        }
    }

    function isDateRangeValid({ startDate, endDate, startDateDb, endDateDb }) {
        if (startDate < startDateDb) {
            if (endDate < startDateDb) {
                return true;
            } else {
                return false;
            }
        } else if (endDate > endDateDb) {
            if (startDate > endDateDb) {
                return true;
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};
