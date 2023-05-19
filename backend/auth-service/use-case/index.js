const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('../exceptions');
const { ERRORS } = require('../utils/constants');

const ErrorUtils = require('../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const { getGoogleAccessToken, getGoogleUser } = require('../external-api-calls');
const { addUser } = require('../internal-service-call');

const { googleOauthOptionsConfig, googleOauthTokenConfig } = require('../config').backendConfig;
const oauthConfig = require('../google-oauth-creds');

const makeBuildOauthLink = require('./build-oauth-link');
const buildOauthLink = makeBuildOauthLink();

const makegetGoogleSignUpLink = require('./get-google-signup-link');
const getGoogleSignUpLink = makegetGoogleSignUpLink({
  buildOauthLink,
  oauthConfig,
  googleOauthOptionsConfig,
});

const makeOauthHandler = require('./oauth-handler');
const oauthHandler = makeOauthHandler({
  jwt,
  getGoogleAccessToken,
  getGoogleUser,
  addUser,
  oauthConfig,
  googleOauthTokenConfig,
  getErrorMessage,
  ValidationError,
});

module.exports = Object.freeze({
  buildOauthLink,
  getGoogleSignUpLink,
  oauthHandler,
});
