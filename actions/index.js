const loginActions      = require('./login.js');
const searchActions     = require('./search.js');
const navigationActions = require('./navigation.js');
const productActions    = require('./product.js');
const retailerActions   = require('./retailer.js');
const producerActions   = require('./producer.js');
const newsActions       = require('./news.js');
const activityActions   = require('./activity.js');
const mapActions        = require('./map.js');
const reviewActions     = require('./review.js');
const profileActions    = require('./profile.js');

module.exports = {
  ...loginActions,
  ...searchActions,
  ...navigationActions,
  ...productActions,
  ...retailerActions,
  ...producerActions,
  ...newsActions,
  ...activityActions,
  ...mapActions,
  ...reviewActions,
  ...profileActions,
};
