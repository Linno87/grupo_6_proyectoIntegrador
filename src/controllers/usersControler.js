module.exports = {
  register: require('./users/register') ,
  login: require('./users/login'),
  processLogin: require('./users/processLogin'),
  users: require('./users/users'),
};
