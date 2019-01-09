const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node', { useNewUrlParser: true });

const Cat = mongoose.model('Cat', { name: String });// 创建集合

const kitty = new Cat({ name: 'Zildjian' }); // 实例化
kitty.save().then(() => console.log('meow'));//

var Schema = mongoose.Schema;

var blogSchema = new Schema({
  name: String,
  age: Number,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
var Blog = mongoose.model('Blog', blogSchema);
// const Blogs = new Blog({ name: 'mz', age: 23 }); // 实例化
// Blogs.save().then(() => console.log(456));


router.get('/',async ctx => {
  const aaa = await Blog.find({ name: 'mz' });
  ctx.body = `${aaa[0].name}`;
});

router.get("/sss", async (ctx) => {
  console.log(541);
  const aaa = await Blog.find({ name: 'mz' });
  ctx.body = `${aaa[0].age}`;
})

app.use(cors())
app.use(router.routes())
// response

app.listen(3000);