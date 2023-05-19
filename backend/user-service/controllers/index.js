const {
  addUser,
} = require('../use-case');
const { formatResponse, formatError } = require('./formateResponse');

const makeAddUserAction = require('./add-user');
const adduserAction = makeAddUserAction({
  addUser,
  formatResponse,
  formatError,
});

module.exports = Object.freeze({
  adduserAction,
});
