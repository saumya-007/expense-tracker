module.exports = function makeGetCategoryByName({
    expensedb,
    Joi,
    getErrorMessage,
    capitalizeFirstLetters,
    categoryTableFields,
    ValidationError,
}) {
    return async function getCategoryByName({ categoryName }) {

        console.log(`
            @ categoryName: ${categoryName},
        `)

        validateExpenseData({ categoryName });

        categoryName = capitalizeFirstLetters({ str: categoryName, withSpace: false, skipFirst: false });

        return await expensedb.getCategoryByName({
            categoryName,
            fieldsToQuery: categoryTableFields,
        });
    }

    function validateExpenseData({ categoryName }) {
        const schema = Joi.object({
            categoryName: Joi.string().required()
        });
        const { error } = schema.validate({ categoryName });
        if (error) {
            const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
            throw new ValidationError('ER-00001', message);
        }
    }
}