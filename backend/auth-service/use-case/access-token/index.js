const Joi = require('joi');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ValidationError, ObjectNotFoundError, ForbiddenError } = require('../../exceptions');
const { ERRORS, DEFAULT_TTL } = require('../../utils/constants');
const { authdb } = require('../../data-access');
const { backendConfig } = require('../../config');

const ErrorUtils = require('../../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const ServiceUtils = require('../../utils/ServiceUtils');
const { convertToMilliseconds } = ServiceUtils.getFunctions.bind(ServiceUtils)();

const EncryptionAndDecryptionUtils = require('../../utils/EncryptionAndDecryptionUtils');
const encryptionAndDecryption = new EncryptionAndDecryptionUtils({ crypto, algorithm: backendConfig.defaultAlgorithm })

const { getUserById } = require('../../internal-service-call')

const makeAddAccessToken = require('./add-access-token');
const addAccessToken = makeAddAccessToken({
    Joi,
    jwt,
    authdb,
    encryptData: encryptionAndDecryption.encrypt.bind(encryptionAndDecryption),
    defaultTTL: DEFAULT_TTL,
    tokenKey: backendConfig.tokenConfig.tokenKey,
    convertToMilliseconds,
    getErrorMessage,
    getUserById,
    ValidationError
});

const makeGetAccessTokenById = require('./get-access-token-by-id');
const getAccessTokenById = makeGetAccessTokenById({
    Joi,
    authdb,
    getErrorMessage,
    ValidationError
})

const makeDeleteAccessToken = require('./delete-access-token');
const deleteAccessToken = makeDeleteAccessToken({
    Joi,
    jwt,
    authdb,
    crypto,
    getErrorMessage,
    ObjectNotFoundError
});

const makeVerifyAccessToken = require('./verify-access-token');
const verifyAccessToken = makeVerifyAccessToken({
    Joi,
    jwt,
    getAccessTokenById,
    decryptData: encryptionAndDecryption.decrypt.bind(encryptionAndDecryption),
    getErrorMessage,
    tokenKey: backendConfig.tokenConfig.tokenKey,
    ForbiddenError,
    Joi,
    ValidationError
});

module.exports = Object.freeze({
    addAccessToken,
    deleteAccessToken,
    verifyAccessToken,
});
