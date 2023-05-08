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
      categoryName,
      userId,
    }) {
      validateCategoryData({categoryName});
      console.log(categoryName)
      categoryName = convertToCammelCase(categoryName);
      console.log(categoryName)
      const expense_category = await getCategoryByName({categoryName});
      
      if (expense_category) {
        throw new AlreadyExistsError('EX-00002', getErrorMessage('EX-00002'));
      }
  
      return await expensedb.addCategory({
        categoryName,
        userId,
      });
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
  