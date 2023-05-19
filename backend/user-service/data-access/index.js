const CockraochDBUtils = require('../utils/CockroachDBUtils');
const { backendConfig } = require('../config');
const { UnknownError } = require('../exceptions');

const cockroach = new CockraochDBUtils({
  connectionString: backendConfig.cockroachCloudCluster.connectionString,
  database: backendConfig.cockroachCloudCluster.dbName,
});

const makeuserdb = require('./user-db');
const userdb = makeuserdb({
  database: backendConfig.cockroachCloudCluster.dbName,
  cockroach,
  UnknownError,
});

module.exports = {
  userdb,
};
