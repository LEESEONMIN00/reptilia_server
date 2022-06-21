const Router = require('koa-router');
const checkLoggedIn = require('../../middleware/checkLoggedIn');
const checkOwnPost = require('../../middleware/checkOwnPost');
const getPostById = require('../../middleware/getPostById');
const postCtrl = require('./posts.ctrl');

const posts = new Router();

//mvc controller
posts.get('/',postCtrl.readAllPosts);
posts.post('/',checkLoggedIn,postCtrl.writePost);

const post = new Router();

post.get('/',postCtrl.readPost);
post.delete('/',checkLoggedIn,checkOwnPost,postCtrl.deletePost);
post.patch('/',checkLoggedIn,checkOwnPost,postCtrl.updatePost);

posts.use('/:id',getPostById, post.routes());


//export default
module.exports = posts;

