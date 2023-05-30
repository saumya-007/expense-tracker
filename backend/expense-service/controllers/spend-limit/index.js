const {
    addSpendLimit,
    getAllSpendLimit,
    updateSpendLimit,
    deleteSpendLimit,
} = require('../../use-case');
const { formatResponse, formatError } = require('../formateResponse');

const makeAddSpendLimitAction = require('./add-spend-limit');
const addSpendLimitAction = makeAddSpendLimitAction({
    addSpendLimit,
    formatResponse,
    formatError,
});

const makeGetAllSpendLimitAction = require('./get-all-spend-limit');
const getAllSpendLimitAction = makeGetAllSpendLimitAction({
    getAllSpendLimit,
    formatResponse,
    formatError,
});

const makeUpdateSpendLimitAction = require('./update-spend-limit');
const updateSpendLimitAction = makeUpdateSpendLimitAction({
    updateSpendLimit,
    formatResponse,
    formatError,
});

const makeDeleteSpendLimitAction = require('./delete-spend-limit');
const deleteSpendLimitAction = makeDeleteSpendLimitAction({
    deleteSpendLimit,
    formatResponse,
    formatError,
});

module.exports = Object.freeze({
    addSpendLimitAction,
    getAllSpendLimitAction,
    updateSpendLimitAction,
    deleteSpendLimitAction
});
