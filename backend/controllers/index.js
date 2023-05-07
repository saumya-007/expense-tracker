const {
  addExpense
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

module.exports = Object.freeze({
  addExpenseAction
});
