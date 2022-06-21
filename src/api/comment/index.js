const Router = require("koa-router");
const commentCtrl = require("./comment.ctrl");

const comment = new Router();

comment.get("/", commentCtrl.readAllComment);
comment.post("/",commentCtrl.writeComment);

module.exports = comment;