module.exports = function makeUpdateSpendLimit({
    expensedb,
    Joi,
    getErrorMessage,
    updateIsSpendLimitChangedFlag,
    ValidationError,
}) {
    return async function updateSpendLimit({ spendLimitId, spendLimit, startDate, endDate, userId }) {

        console.log(`
        @ spendLimitId: ${spendLimitId},
        @ spendLimit: ${spendLimit},
        @ startDate: ${startDate},
        @ endDate: ${endDate},
        @ userId: ${userId},
      `)

        validateData({ spendLimitId, spendLimit, startDate, endDate, userId });

        if (startDate > endDate) {
            throw new ValidationError('ER-00009', getErrorMessage('ER-00009'));
        }

        const spendLimitDetails = await expensedb.getSpendLimitById({ spendLimitId })

        const dateRanges = await expensedb.getAllSpendLimitExpectOne({ userId, spendLimitId, fieldsToQuery: ['start_date', 'end_date', 'spend_limit'] });
        if (dateRanges
            .map((range) => isDateRangeValid({
                spendLimit,
                spendLimitDb: range['spend_limit'],
                startDate: new Date(startDate).getTime(),
                endDate: new Date(endDate).getTime(),
                startDateDb: new Date(range['start_date']).getTime(),
                endDateDb: new Date(range['end_date']).getTime()
            }))
            .includes(false)) {
            throw new ValidationError('ER-00010', getErrorMessage('ER-00010'));
        }

        const response = await expensedb.updateSpendLimit({ 
            spendLimitId,
            spendLimit: spendLimit ? spendLimit : spendLimitDetails['spend_limit'],
            startDate: startDate ? startDate : spendLimitDetails['start_date'],
            endDate: endDate ? endDate : spendLimitDetails['end_date'],
        });

        if (!response) {
            throw new ValidationError('ER-00011', getErrorMessage('ER-00011'));   
        }

        await updateIsSpendLimitChangedFlag({
            isSpentLimitChanged: true,
            spendLimitId,
        })
        
        return response;
    };

    function validateData({ spendLimitId, spendLimit, startDate, endDate, userId }) {
        const schema = Joi.object({
            spendLimitId: Joi.string().guid().required(),
            spendLimit: Joi.number(),
            startDate: Joi.date(),
            endDate: Joi.date(),
            userId: Joi.string().guid().required(),
        });
        const { error } = schema.validate({ spendLimitId, spendLimit, startDate, endDate, userId });
        if (error) {
            const message = [(getErrorMessage('ER-00011') || ''), error.message].join(', ');
            throw new ValidationError('ER-00011', message);
        }
    }

    function isDateRangeValid({spendLimit, spendLimitDb, startDate, endDate, startDateDb, endDateDb }) {
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
            if (spendLimit === spendLimitDb) {
                return true;
            }
            return false;
        }
    }
};
