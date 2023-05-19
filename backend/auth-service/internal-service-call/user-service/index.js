const axios = require('axios');
const { UnknownError } = require('../../exceptions')
const { ERRORS } = require('../../utils/constants');
const ErrorUtils = require('../../utils/ErrorUtils');

const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));
const config = require('../../config');

const makeAddUser = require('./add-user');
const addUser = makeAddUser({
    config,
    axios,
    UnknownError,
    getErrorMessage,
});

module.exports = Object.freeze({
    addUser,
})

