const loginActions = require('./login.js');
const registerActions = require('./register.js');
const searchActions = require('./search.js');

module.exports = {
  ...loginActions,
  ...registerActions,
  ...searchActions,
};
