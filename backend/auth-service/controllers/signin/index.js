const {
    authenticateUser
  } = require('../../use-case');
  const { formatResponse, formatError } = require('../formateResponse');
  
  const makeAuthenticateUserAction = require('./authenticate-user');
  const authenticateUserAction = makeAuthenticateUserAction({
    authenticateUser,
    formatResponse,
    formatError,
  });
  
  module.exports = Object.freeze({
    authenticateUserAction
  });
  