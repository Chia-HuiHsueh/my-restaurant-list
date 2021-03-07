const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const routes = require('./routes')
require('./config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.danger_msg = req.flash('danger_msg')
  res.locals.search_msg = req.flash('search_msg')
  res.locals.registration_success_msg = req.flash('registration_success_msg')
  res.locals.passportError = req.flash('errors')
  next()
})

app.use(routes)


app.listen(process.env.port, () => {
  console.log(`Express is listening on localhost:${process.env.port}`)
})
