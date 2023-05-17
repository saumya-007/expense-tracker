const {
  addExpense,
  importExpense,
} = require('../use-case');
const {formatResponse, formatError} = require('./formateResponse');
const {DEAULT_SPEND_LIMIT} = require('../utils/constants');

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

module.exports = Object.freeze({
  addExpenseAction,
  importExpensesAction
});
