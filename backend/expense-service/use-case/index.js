const Joi = require('joi');
const { ValidationError, AlreadyExistsError, ObjectNotFoundError } = require('../exceptions');
const { expensedb } = require('../data-access');
const { ERRORS, CATEGORY_TABLE, EXPENSE_TABLE } = require('../utils/constants');

const ErrorUtils = require('../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const ServiceUtils = require('../utils/ServiceUtils');
const { capitalizeFirstLetters } = ServiceUtils.getFunctions.bind(ServiceUtils)();

const fs = require('fs')
const { parse } = require('csv-parse');

const makeGetCategoryByName = require('./get-category-by-name');
const getCategoryByName = makeGetCategoryByName({
  expensedb,
  Joi,
  getErrorMessage,
  capitalizeFirstLetters,
  categoryTableFields: CATEGORY_TABLE,
  ValidationError,
})

const makeAddCategory = require('./add-category');
const addCategory = makeAddCategory({
  expensedb,
  Joi,
  getErrorMessage,
  capitalizeFirstLetters,
  getCategoryByName,
  ValidationError,
  AlreadyExistsError,
});

const makeAddExpense = require('./add-expense');
const addExpense = makeAddExpense({
  expensedb,
  Joi,
  getErrorMessage,
  capitalizeFirstLetters,
  getCategoryByName,
  addCategory,
  categoryTableFields: CATEGORY_TABLE,
  ValidationError,
  AlreadyExistsError,
});

const makeImportExpense = require('./import-expenses');
const importExpense = makeImportExpense({
  Joi,
  fs,
  parse,
  getErrorMessage,
  capitalizeFirstLetters,
  addExpense,
  expenseTableFields: EXPENSE_TABLE,
  ValidationError,
  AlreadyExistsError,
});

const makeGetUserExpense = require('./get-user-expense');
const getUserExpense = makeGetUserExpense({
  expensedb,
  Joi,
  getErrorMessage,
  ValidationError,
})

module.exports = Object.freeze({
  addExpense,
  importExpense,
  getUserExpense,
});
