const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { ValidationError, AlreadyExistsError, ObjectNotFoundError } = require('../exceptions');
const { ERRORS, CATEGORY_TABLE, EXPENSE_TABLE } = require('../utils/constants');

const ErrorUtils = require('../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const ServiceUtils = require('../utils/ServiceUtils');
const { capitalizeFirstLetters } = ServiceUtils.getFunctions.bind(ServiceUtils)();

const { getGoogleOauthToken, getGoogleUser } = require('../external-api-calls/google')

const { googleOauthOptionsConfig, googleOauthTokenConfig } = require('../config').backendConfig;
const oauthConfig = require('../google-oauth-creds');

const makeBuildOauthLink = require('./build-oauth-link');
const buildOauthLink = makeBuildOauthLink();

const makeGetOauthLink = require('./get-oauth-link');
const getOauthLink = makeGetOauthLink({
  buildOauthLink,
  oauthConfig,
  googleOauthOptionsConfig,
})

const makeOauthHandler = require('./oauth-handler');
const oauthHandler = makeOauthHandler({
  jwt,
  getGoogleOauthToken,
  getGoogleUser,
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
