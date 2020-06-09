const developmentData = require('./development-data');
const testData = require('./test-data');
const productionData = require('./production-data');

const ENV = process.env.NODE_ENV || 'development';

const data = {
  development: developmentData,
  test: testData,
  production: productionData,
};

module.exports = data[ENV];
