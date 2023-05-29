const ERRORS = {
  'ER-00001': 'Invalid input provided',
  'ER-00002': 'Category already exist',
  'ER-00003': 'Invalid csv format',
  'ER-00004': 'No expense found'
}

const CATEGORY_TABLE = ['id', 'category_name'];

const EXPENSE_TABLE = ['activity', 'category_name', 'amount', 'spend_limit', 'spent_on'];

const DEAULT_SPEND_LIMIT = 0.00;
module.exports = Object.freeze({
  ERRORS,
  CATEGORY_TABLE,
  DEAULT_SPEND_LIMIT,
  EXPENSE_TABLE,
})