const {
    verifyAccessToken
  } = require('../../use-case');
  const { formatResponse, formatError } = require('../formateResponse');
  
  const makeVerifyAccessTokenAction = require('./verify-access-token');
  const verifyAccessTokenAction = makeVerifyAccessTokenAction({
    verifyAccessToken,
    formatResponse,
    formatError,
  });
  
  module.exports = Object.freeze({
    verifyAccessTokenAction
  });
  