const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const auth = new Router();

auth.post('/login', authCtrl.login);
auth.post('/register',authCtrl.register);
auth.post('/logout', authCtrl.logout);


module.exports = auth;
