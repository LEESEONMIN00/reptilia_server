require('dotenv').config();
const Koa = require('koa');
const koaBodyparser = require("koa-bodyparser");
const Router = require('koa-router')
const api = require('./api');
const mongoose = require('mongoose');
const jwtMiddleware = require('./middleware/jwtMiddleware');
const path = require('path');
const { send } = require('process');
const serve = require('koa-static');
const cors = require('@koa/cors');
//const {createFakeData} = require('./createFakeData');



const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('DB생성완료');
    //  createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });


const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
app.use(cors());

app.use(koaBodyparser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const dir = path.resolve(__dirname, '../albatross/build');
app.use(serve(dir));

app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: dir });
  }
});
const port = PORT;


app.listen(port, () => {
  console.log(`${port}サーバーが準備できました`);
});