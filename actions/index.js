const loginActions      = require('./login.js');
const searchActions     = require('./search.js');
const navigationActions = require('./navigation.js');
const productActions    = require('./product.js');
const retailerActions   = require('./retailer.js');

module.exports = {
  ...loginActions,
  ...searchActions,
  ...navigationActions,
  ...productActions,
  ...retailerActions,
};
