const ERRORS = {
  'EX-00001': 'Invalid input provided',
  'EX-00002': 'Category already exist',
  'EX-00003': 'Invalid csv format'
}

const USER_TABLE = [
  'id',
  'email',
  'name',
  'first_name',
  'last_name',
  'profile_photo_url',
];

module.exports = Object.freeze({
  ERRORS,
  USER_TABLE,
})