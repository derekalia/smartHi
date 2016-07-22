const loginActions      = require('./login.js');
const registerActions   = require('./register.js');
const searchActions     = require('./search.js');
const navigationActions = require('./navigation.js');
const productActions    = require('./product.js');
const producerActions = require('./producer.js');

module.exports = {
  ...loginActions,
  ...registerActions,
  ...searchActions,
  ...navigationActions,
  ...productActions,
  ...producerActions,
};
