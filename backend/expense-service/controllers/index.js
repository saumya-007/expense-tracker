const userExpensecontrollers = require('./user-expense');
const spendLimit = require('./spend-limit');

module.exports = Object.freeze({
    ...userExpensecontrollers,
    ...spendLimit
})