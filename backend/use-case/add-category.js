module.exports = function makeAddCategory({
    expensedb,
    Joi,
    getErrorMessage,
    getCategoryByName,
    convertToCammelCase,
    ValidationError,
    AlreadyExistsError,
  }) {
    return async function addCategory({
      categoryName
    }) {
      // add functionality to add created by at and modified by at
      validateCategoryData({categoryName});
      categoryName = convertToCammelCase(categoryName);
      const expense_category = getCategoryByName({categoryName});
      if (expense_category) {
        throw new AlreadyExistsError('EX-00002', getErrorMessage('EX-00002'));
      }
  
      return await expensedb.addCategory({expense_category});
    };
  
    function validateCategoryData({categoryName}) {
      const schema = Joi.object({
        categoryName: Joi.string().required(),
      });
      const { error } = schema.validate({categoryName});
      if (error) {
        const message = getErrorMessage('EX-00001') || ''  + error.message;
        throw new ValidationError('EX-00001', message);
      }
    }
  };
  