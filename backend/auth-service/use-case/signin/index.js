const Joi = require('joi');
const crypto = require('crypto');
const { ValidationError } = require('../../exceptions');
const { ERRORS } = require('../../utils/constants');
const { backendConfig } = require('../../config');

const ErrorUtils = require('../../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const EncryptionAndDecryptionUtils = require('../../utils/EncryptionAndDecryptionUtils');
const encryptionAndDecryption = new EncryptionAndDecryptionUtils({ crypto, algorithm: backendConfig.defaultAlgorithm})

const { getUserByEmail } = require('../../internal-service-call');
const { addAccessToken } = require('../access-token') 

const makeAuthenticateUser = require('./authenticate-user');
const authenticateUser = makeAuthenticateUser({
    Joi,
    getUserByEmail,
    addAccessToken,
    decryptData: encryptionAndDecryption.decrypt.bind(encryptionAndDecryption),
    getErrorMessage,
    ValidationError,
});

module.exports = Object.freeze({
    authenticateUser,
});
