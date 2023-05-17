const env = process.env.NODE_DEV ? process.env.NODE_ENV : 'development';
const config = require(`./${env}.js`);
module.exports = config;
