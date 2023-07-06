const {
  addExpense,
  importExpense,
  getUserExpense,
  updateUserExpense,
  deleteUserExpense,
  exportExpense,
} = require('../../use-case');
const { formatResponse, formatError } = require('../formateResponse');
const { DEAULT_SPEND_LIMIT } = require('../../utils/constants');

const makeAddExpenseAction = require('./add-expense');
const addExpenseAction = makeAddExpenseAction({
  addExpense,
  formatResponse,
  formatError,
  DEAULT_SPEND_LIMIT,
});

const makeImportExpensesAction = require('./import-expenses');
const importExpensesAction = makeImportExpensesAction({
  importExpense,
  formatResponse,
  formatError,
});

const makeGetUserExpenseAction = require('./get-user-expense');
const getUserExpenseAction = makeGetUserExpenseAction({
  getUserExpense,
  formatResponse,
  formatError,
});

const makeUpdateUserExpenseAction = require('./update-user-expense');
const updateUserExpenseAction = makeUpdateUserExpenseAction({
  updateUserExpense,
  formatResponse,
  formatError,
});

const makeDeleteUserExpenseAction = require('./delete-user-expense');
const deleteUserExpenseAction = makeDeleteUserExpenseAction({
  deleteUserExpense,
  formatResponse,
  formatError,
});

const makeExportExpenseAction = require('./export-expense');
const exportExpenseAction = makeExportExpenseAction({
  exportExpense,
  formatResponse,
  formatError,
})

module.exports = Object.freeze({
  addExpenseAction,
  importExpensesAction,
  getUserExpenseAction,
  updateUserExpenseAction,
  deleteUserExpenseAction,
  exportExpenseAction,
});
