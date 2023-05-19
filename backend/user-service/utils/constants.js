const ERRORS = {
  'ER-00001': 'Invalid input provided',
  'ER-00002': 'User with the same email already exists already registered',
  'ER-00003': 'User does not exists'
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