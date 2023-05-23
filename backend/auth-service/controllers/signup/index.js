const {
  getGoogleSignUpLink,
  oauthHandler,
} = require('../../use-case');
const { formatResponse, formatError } = require('../formateResponse');

const makeGetGoogleSignUpLinkAction = require('./get-google-signup-link');
const getGoogleSignUpLinkAction = makeGetGoogleSignUpLinkAction({
  getGoogleSignUpLink,
  formatResponse,
  formatError,
})

const makeOauthHandlerAction = require('./oauth-handler');
const oauthHandlerAction = makeOauthHandlerAction({
  oauthHandler,
  formatResponse,
  formatError,
})

module.exports = Object.freeze({
  getGoogleSignUpLinkAction,
  oauthHandlerAction
});
