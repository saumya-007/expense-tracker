const axios = require('axios');
const { AuthenticationFailed } = require('../../exceptions')
const makeGetGoogleOauthToken = require('./get-google-oauth-token');
const getGoogleOauthToken = makeGetGoogleOauthToken({
    axios,
});

module.exports = Object.freeze({
    getGoogleOauthToken,
    AuthenticationFailed,
})