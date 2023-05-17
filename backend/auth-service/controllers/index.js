const {
  getOauthLink,
  oauthHandler,
} = require('../use-case');
const { formatResponse, formatError } = require('./formateResponse');

const makeGetOauthLinkAction = require('./get-oauth-link');
const getOauthLinkAction = makeGetOauthLinkAction({
  getOauthLink,
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
  getOauthLinkAction,
  oauthHandlerAction
});
