const ERRORS = {
  'ER-00001': 'Invalid input provided',
  'ER-00002': 'Category already exist',
  'ER-00003': 'Invalid csv format',
  'ER-00004': 'No expense found',
  'ER-00005': 'Error while getting spend limit',
  'ER-00006': 'No spend limit found',
  'ER-00007': 'Error while deleting spend limit',
  'ER-00008': 'Error while adding spend limit',
  'ER-00009': 'End date can not be greater than start date',
  'ER-00010': 'Date range overlapping',
  'ER-00011': 'Error while updating spend limit',
  'ER-00012': 'Spend Limit does not belong to any range, please add a new range',
  'ER-00013': 'Error while updateing isSpentLimitChanged flag'
}

const CATEGORY_TABLE = ['id', 'category_name'];

const EXPENSE_TABLE = ['activity', 'category_name', 'amount', 'spent_on'];

const DEAULT_SPEND_LIMIT = 0.00;
module.exports = Object.freeze({
  ERRORS,
  CATEGORY_TABLE,
  DEAULT_SPEND_LIMIT,
  EXPENSE_TABLE,
})