const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error！')
})

db.once('open', () => {
  console.log('mongodb connect！')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

//顯示所有餐廳到首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
app.get('/restaurants/create', (req, res) => {
  return res.render('create')
})

//create new restaurant
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  return Restaurant.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//show restaurant detail
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//restaurant detail edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', restaurant))
    .catch(error => console.log(error))
})
//update restaurant new edit
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.address = req.body.address
      restaurant.phone = req.body.phone
      restaurant.rating = req.body.rating
      restaurant.google_map = req.body.google_map
      restaurant.description = req.body.description
      restaurant.menu = req.body.menu
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.results.filter(restaurant => { return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) })

//   if (restaurants.length === 0) {
//     res.render('error', { keyword: keyword })
//   } else { res.render('index', { restaurants: restaurants, keyword: keyword }) }

// })

// app.get('/category/:restaurant_category', (req, res) => {
//   const restaurantCategory = restaurantList.results.filter(restaurant => { return restaurant.category === req.params.restaurant_category })
//   res.render('index', { restaurants: restaurantCategory })
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
