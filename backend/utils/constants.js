const ERRORS = {
    'EX-00001' : 'Invalid input provided',
    'EX-00002' : 'Category already exist'
}

const CATEGORY_TABLE = ['id', 'category_name'];

const DEAULT_SPEND_LIMIT = 0.00;
module.exports = Object.freeze({
  ERRORS,
  CATEGORY_TABLE,
  DEAULT_SPEND_LIMIT,
})