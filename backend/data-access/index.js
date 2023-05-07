const CockraochDBUtils = require('../utils/CockroachDBUtils');
const { backendConfig } = require('../config');
const { UnknownError } = require('../exceptions');

const cockroach = new CockraochDBUtils({
  connectionString: backendConfig.cockroachCloudCluster.connectionString,
  database: backendConfig.cockroachCloudCluster.dbName,
});

const makeExpenseDb = require('./expense-db');
const expensedb = makeExpenseDb({
  database: backendConfig.cockroachCloudCluster.dbName,
  cockroach,
  UnknownError,
});

module.exports = {
  expensedb,
};
