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

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))

})
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Restaurant.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.results.filter(restaurant => { return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) })

//   if (restaurants.length === 0) {
//     res.render('error', { keyword: keyword })
//   } else { res.render('index', { restaurants: restaurants, keyword: keyword }) }

// })
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant: restaurant })
// })
// app.get('/category/:restaurant_category', (req, res) => {
//   const restaurantCategory = restaurantList.results.filter(restaurant => { return restaurant.category === req.params.restaurant_category })
//   res.render('index', { restaurants: restaurantCategory })
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
