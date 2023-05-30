const Joi = require('joi');
const { ValidationError, ObjectNotFoundError } = require('../../exceptions');
const { expensedb } = require('../../data-access');
const { ERRORS } = require('../../utils/constants');

const ErrorUtils = require('../../utils/ErrorUtils');
const getErrorMessage = new ErrorUtils({ errors: ERRORS }).getErrorMessageFromCode.bind(new ErrorUtils({ errors: ERRORS }));

const { updateIsSpendLimitChangedFlag } = require('../user-expense')

const makeGetAllSpendLimit = require('./get-all-spend-limit');
const getAllSpendLimit = makeGetAllSpendLimit({
    expensedb,
    Joi,
    getErrorMessage,
    ValidationError,
});

const makeAddSpendLimit = require('./add-spend-limit');
const addSpendLimit = makeAddSpendLimit({
    expensedb,
    Joi,
    getErrorMessage,
    getAllSpendLimit,
    ValidationError,
});

const makeUpdateSpendLimit = require('./update-spend-limit');
const updateSpendLimit = makeUpdateSpendLimit({
    expensedb,
    Joi,
    getErrorMessage,
    updateIsSpendLimitChangedFlag,
    getAllSpendLimit,
    ValidationError,
});

const makeDeleteSpendLimit = require('./delete-spend-limit');
const deleteSpendLimit = makeDeleteSpendLimit({
    expensedb,
    Joi,
    getErrorMessage,
    ValidationError,
    ObjectNotFoundError,
});

module.exports = Object.freeze({
    getAllSpendLimit,
    addSpendLimit,
    deleteSpendLimit,
    updateSpendLimit
});
