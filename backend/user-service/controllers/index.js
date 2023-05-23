const {
  addUser,
  getUserById,
  getUserByEmail,
  updateUser,
} = require('../use-case');
const { formatResponse, formatError } = require('./formateResponse');

const makeAddUserAction = require('./add-user');
const adduserAction = makeAddUserAction({
  addUser,
  formatResponse,
  formatError,
});

const makeGetUserByIdAction = require('./get-user-by-id');
const getUserByIdAction = makeGetUserByIdAction({
  getUserById,
  formatResponse,
  formatError,
});

const makeGetUserByEmailAction = require('./get-user-by-email');
const getUserByEmailAction = makeGetUserByEmailAction({
  getUserByEmail,
  formatResponse,
  formatError,
});

const makeUpdateUserAction = require('./update-user');
const updateUserAction = makeUpdateUserAction({
  updateUser,
  formatResponse,
  formatError,
});

module.exports = Object.freeze({
  adduserAction,
  getUserByIdAction,
  getUserByEmailAction,
  updateUserAction,
});
