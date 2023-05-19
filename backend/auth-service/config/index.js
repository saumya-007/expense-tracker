const backendConfig = require('./backend-config');
const serviceConfig = require('./service-config');
const serviceEndpoints = require('./service-endpoints');
module.exports = Object.freeze({
    backendConfig: backendConfig,
    serviceConfig: serviceConfig,
    serviceEndpoints: serviceEndpoints,
});