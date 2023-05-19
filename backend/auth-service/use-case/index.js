const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('../exceptions');
const { ERRORS } = require('../utils/constants');

const ErrorUtils = require('../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const { getGoogleOauthToken, getGoogleUser } = require('../external-api-calls');
const { addUser } = require('../internal-service-call');

const { googleOauthOptionsConfig, googleOauthTokenConfig } = require('../config').backendConfig;
const oauthConfig = require('../google-oauth-creds');

const makeBuildOauthLink = require('./build-oauth-link');
const buildOauthLink = makeBuildOauthLink();

const makeGetOauthLink = require('./get-oauth-link');
const getOauthLink = makeGetOauthLink({
  buildOauthLink,
  oauthConfig,
  googleOauthOptionsConfig,
});

const makeOauthHandler = require('./oauth-handler');
const oauthHandler = makeOauthHandler({
  jwt,
  getGoogleOauthToken,
  getGoogleUser,
  addUser,
  oauthConfig,
  googleOauthTokenConfig,
  getErrorMessage,
  ValidationError,
});

module.exports = Object.freeze({
  buildOauthLink,
  getOauthLink,
  oauthHandler,
});
