var home = require('../app/controllers/home');
var login = require('../app/controllers/login');

  module.exports = function (app){
  app.get('/transfer', home.home);
 }
