const CockraochDBUtils = require('../utils/CockroachDBUtils');
const { backendConfig } = require('../config');
const { UnknownError } = require('../exceptions');

const cockroach = new CockraochDBUtils({
  connectionString: backendConfig.cockroachCloudCluster.connectionString,
  database: backendConfig.cockroachCloudCluster.dbName,
});

const makeAuthDb = require('./auth-db');
const authdb = makeAuthDb({
    cockroach,
    database: backendConfig.cockroachCloudCluster.dbName,
    UnknownError, 
});

module.exports = Object.freeze({
    authdb
});
