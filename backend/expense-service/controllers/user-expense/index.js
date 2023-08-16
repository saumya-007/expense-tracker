const {
  addExpense,
  importExpense,
  getUserExpense,
  updateUserExpense,
  deleteUserExpense,
  exportExpense,
  getUserExpenseById,
  getUserExpenseByDate,
  getUserExpenseByMonth,
  getUserExpenseByMonthAndCatgory,
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

const makeGetUserExpenseByDateAction = require('./get-user-expense-by-date');
const getUserExpenseByDateAction = makeGetUserExpenseByDateAction({
  getUserExpenseByDate,
  formatResponse,
  formatError,
});

const makeGetUserExpenseByIdAction = require('./get-user-expense-by-id');
const getUserExpenseByIdAction = makeGetUserExpenseByIdAction({
  getUserExpenseById,
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

const makeGetUserExpenseByMonthAction = require('./get-user-expenses-by-month');
const getUserExpenseByMonthAction = makeGetUserExpenseByMonthAction({
  getUserExpenseByMonth,
  formatResponse,
  formatError,
});

const makeGetUserExpenseByMonthAndCategoryAction = require('./get-user-expenses-by-month-and-category');
const getUserExpenseByMonthAndCategoryAction = makeGetUserExpenseByMonthAndCategoryAction({
  getUserExpenseByMonthAndCatgory,
  formatResponse,
  formatError,
});

module.exports = Object.freeze({
  addExpenseAction,
  importExpensesAction,
  getUserExpenseAction,
  updateUserExpenseAction,
  deleteUserExpenseAction,
  exportExpenseAction,
  getUserExpenseByIdAction,
  getUserExpenseByDateAction,
  getUserExpenseByMonthAction,
  getUserExpenseByMonthAndCategoryAction,
});
