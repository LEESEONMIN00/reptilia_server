const Router = require('koa-router');
const userCtrl = require('./user.ctrl');

const user = new Router();

user.get('/:id', userCtrl.getUserInfo);


module.exports = user;