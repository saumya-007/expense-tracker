const ERRORS = {
  'ER-00001': 'Error while signing up',
  'ER-00002': 'Failed to fetch google api token',
  'ER-00003': 'Failed to fetch google user info',
  'ER-00004': 'Error while adding user',
  'ER-00005': 'Google email not verified',
  'ER-00006': 'Error while addding access token',
  'ER-00007': 'User does not exists',
  'ER-00008': 'Error while getting by id',
  'ER-00009': 'Access Token Expired',
  'ER-00010': 'Invalid email provided',
  'ER-00011': 'Invalid password provided',
  'ER-00012': 'Invalid input provided',
  'ER-00013': 'Invalid token provided'
}

const DEFAULT_TTL = '30s'

module.exports = Object.freeze({
  ERRORS,
  DEFAULT_TTL,
})