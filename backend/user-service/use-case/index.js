const Joi = require('joi');
const { ValidationError, AlreadyExistsError, ObjectNotFoundError } = require('../exceptions');
const { userdb } = require('../data-access');
const { ERRORS, USER_TABLE } = require('../utils/constants');

const ErrorUtils = require('../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const ServiceUtils = require('../utils/ServiceUtils');
const { capitalizeFirstLetters } = ServiceUtils.getFunctions.bind(ServiceUtils)();

const makegetUserByEmail = require('./get-user-by-email');
const getUserByEmail = makegetUserByEmail({
  userdb,
  Joi,
  capitalizeFirstLetters,
  getErrorMessage,
  userTableFields: USER_TABLE,
  ValidationError,
})

const makeAddUser = require('./add-user');
const addUser = makeAddUser({
  userdb,
  Joi,
  capitalizeFirstLetters,
  getErrorMessage,
  getUserByEmail,
  ValidationError,
});

module.exports = Object.freeze({
  addUser,
});
