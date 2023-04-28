const {
  addExpense
} = require('../use-case');
const { formatResponse, formatError } = require('./formateResponse');

const makeAddExpenseAction = require('./add-expense');
const addExpenseAction = makeAddExpenseAction({
    addExpense,
    formatResponse,
    formatError,
  });

module.exports = Object.freeze({
  addExpenseAction
});
