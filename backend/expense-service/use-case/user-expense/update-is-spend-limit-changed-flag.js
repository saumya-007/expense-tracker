module.exports = function makeUpdateIsSpendLimitChangedFlag({
    Joi,
    expensedb,
    getErrorMessage,
    ValidationError
}) {
    return async function updateIsSpendLimitChangedFlag({
        isSpentLimitChanged,
        spendLimitId
    }) {
        console.log(`
        @ isSpentLimitChanged: ${isSpentLimitChanged},
        @ spendLimitId: ${spendLimitId}
      `)
        validateData({ isSpentLimitChanged, spendLimitId });
        expensedb.updateIsSpendLimitChangedFlag({ isSpentLimitChanged, spendLimitId })
    };

    function validateData({ isSpentLimitChanged, spendLimitId }) {
        const schema = Joi.object({
            isSpentLimitChanged: Joi.boolean().required(),
            spendLimitId: Joi.string().guid().required()
        });
        const { error } = schema.validate({ isSpentLimitChanged, spendLimitId });
        if (error) {
            const message = [(getErrorMessage('ER-00013') || ''), error.message].join(', ');
            throw new ValidationError('ER-00013', message);
        }
    }
}