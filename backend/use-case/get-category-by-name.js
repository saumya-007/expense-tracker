module.exports = function makeGetCategoryByName({
    expensedb,
    Joi,
    getErrorMessage,
    convertToCammelCase,
    categoryTableFields,
    ValidationError,
}) {
    return async function getCategoryByName({categoryName}) {
        validateExpenseData({ categoryName });

        categoryName = convertToCammelCase(categoryName);

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
          const message = getErrorMessage('EX-00001') || ''  + error.message;
          throw new ValidationError('EX-00001', message);
        }
      }
}