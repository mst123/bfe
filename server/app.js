import Koa from 'koa';
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import koaBody from 'koa-body'
import logger from 'koa-logger'
import compose from 'koa-compose'
import koaStatic from 'koa-static';
import index from './routes/index'
import users from './routes/users'
const app = new Koa()
// error handler
onerror(app)

// middlewares
compose[
  koaBody(),
  json(),
  logger(),
  koaStatic(__dirname + '/public',
  views(__dirname + '/views', {
    extension: 'pug'
  })),
  views(__dirname + '/views', {
    extension: 'pug'
  })
]

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
