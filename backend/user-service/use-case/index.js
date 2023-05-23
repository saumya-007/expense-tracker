const Joi = require('joi');
const { ValidationError, AlreadyExistsError, ObjectNotFoundError } = require('../exceptions');
const crypto = require('crypto');
const { userdb } = require('../data-access');
const { ERRORS, USER_TABLE } = require('../utils/constants');
const { backendConfig } = require('../config')
const ErrorUtils = require('../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const ServiceUtils = require('../utils/ServiceUtils');
const { capitalizeFirstLetters } = ServiceUtils.getFunctions.bind(ServiceUtils)();

const EncryptionAndDecryptionUtils = require('../utils/EncryptionAndDecryptionUtils');
const encryptionAndDecryption = new EncryptionAndDecryptionUtils({ crypto, algorithm: backendConfig.defaultAlgorithm})

const makeGetUserById = require('./get-user-by-id');
const getUserById = makeGetUserById({
  userdb,
  Joi,
  capitalizeFirstLetters,
  getErrorMessage,
  userTableFields: USER_TABLE,
  ValidationError,
})

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

const makeUpdateUser = require('./update-user');
const updateUser = makeUpdateUser({
  userdb,
  Joi,
  encryptData: encryptionAndDecryption.encrypt.bind(encryptionAndDecryption),
  getErrorMessage,
  getUserById,
  ValidationError,
});


module.exports = Object.freeze({
  addUser,
  updateUser,
  getUserById,
  getUserByEmail,
});
