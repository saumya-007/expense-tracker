module.exports = function makeDeleteSpendLimit({
    expensedb,
    Joi,
    getErrorMessage,
    ValidationError,
    ObjectNotFoundError,
}) {
    return async function deleteSpendLimit({
        spendLimitId,
    }) {

        console.log(`
        @ spendLimitId: ${spendLimitId},
      `)
        validateData({ spendLimitId });
        const expense_details = await expensedb.getSpendLimitById({ spendLimitId });

        if (!expense_details) {
            throw new ObjectNotFoundError('ER-00006', getErrorMessage('ER-00006'));
        }

        await expensedb.deleteSpendLimit({ spendLimitId });

        await updateIsSpendLimitChangedFlag({
            isSpentLimitChanged: true,
            spendLimitId,
        })

        return true;
    };

    function validateData({ spendLimitId }) {
        const schema = Joi.object({
            spendLimitId: Joi.string().guid().required(),
        });
        const { error } = schema.validate({ spendLimitId });
        if (error) {
            const message = [(getErrorMessage('ER-00007') || ''), error.message].join(', ');
            throw new ValidationError('ER-00007', message);
        }
    }
};
