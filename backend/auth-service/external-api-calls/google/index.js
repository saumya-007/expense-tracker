const axios = require('axios');
const { AuthenticationFailed } = require('../../exceptions')
const { ERRORS } = require('../../utils/constants');
const ErrorUtils = require('../../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const makeGetGoogleOauthToken = require('./get-google-oauth-token');
const getGoogleOauthToken = makeGetGoogleOauthToken({
    axios,
    AuthenticationFailed,
    getErrorMessage,
});

const makeGetGoogleUser = require('./get-google-user');
const getGoogleUser = makeGetGoogleUser({
    axios,
    AuthenticationFailed,
    getErrorMessage,
});

module.exports = Object.freeze({
    getGoogleOauthToken,
    getGoogleUser,
})