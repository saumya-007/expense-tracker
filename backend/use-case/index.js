const Joi = require('joi');
const { ValidationError, AlreadyExistsError, ObjectNotFoundError } = require('../exceptions');
const { expensedb } = require('../data-access');
const { ERRORS, CATEGORY_TABLE } = require('../utils/constants');

const ErrorUtils = require('../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode;

const ServiceUtils = require('../utils/ServiceUtils');
const { convertToCammelCase } = new ServiceUtils.getFunctions()

const makeAddCategory = require('./add-category');
const addCategory = makeAddCategory({
  expensedb,
  Joi,
  getErrorMessage,
  convertToCammelCase,
  ValidationError,
  AlreadyExistsError,
});

const makeGetCategoryByName = require('./get-category-by-name');
const getCategoryByName = makeGetCategoryByName({
  expensedb,
  Joi,
  getErrorMessage,
  categoryTableFields,
  ValidationError,
})

const makeAddExpense = require('./add-expense');
const addExpense = makeAddExpense({
  expensedb,
  Joi,
  getErrorMessage,
  convertToCammelCase,
  getCategoryByName,
  addCategory,
  categoryTableFields: CATEGORY_TABLE,
  ValidationError,
  AlreadyExistsError,
});

module.exports = Object.freeze({
  addExpense,
});
