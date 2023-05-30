const userExpenseUseCases = require('./user-expense');
const spendLimitUseCases = require('./spend-limit');

module.exports = Object.freeze({
    ...userExpenseUseCases,
    ...spendLimitUseCases
})