const Router = require('koa-router');
const posts = require('./posts');
const auth = require('./auth');
const comment = require('./comment');
const user = require('./user');
const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/comment',comment.routes());
api.use('/user', user.routes());
module.exports = api;