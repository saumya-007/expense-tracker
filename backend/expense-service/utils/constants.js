const ERRORS = {
  'ER-00001': 'Invalid input provided',
  'ER-00002': 'Category already exist',
  'ER-00003': 'Invalid csv format'
}

const CATEGORY_TABLE = ['id', 'category_name'];

const EXPENSE_TABLE = ['activity', 'category name', 'amount', 'spend limit', 'spent on'];

const DEAULT_SPEND_LIMIT = 0.00;
module.exports = Object.freeze({
  ERRORS,
  CATEGORY_TABLE,
  DEAULT_SPEND_LIMIT,
  EXPENSE_TABLE,
})