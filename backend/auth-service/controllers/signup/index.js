const {
  getGoogleSignUpLink,
  oauthHandler,
} = require('../../use-case');
const { formatResponse, formatError, formatHtmlResponse } = require('../formateResponse');

const makeGetGoogleSignUpLinkAction = require('./get-google-signup-link');
const getGoogleSignUpLinkAction = makeGetGoogleSignUpLinkAction({
  getGoogleSignUpLink,
  formatResponse,
  formatError,
})

const makeOauthHandlerAction = require('./oauth-handler');
const oauthHandlerAction = makeOauthHandlerAction({
  oauthHandler,
  formatHtmlResponse,
  formatError,
})

module.exports = Object.freeze({
  getGoogleSignUpLinkAction,
  oauthHandlerAction
});
