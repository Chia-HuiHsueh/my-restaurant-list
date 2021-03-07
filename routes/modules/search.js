const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
//set search bar
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  Restaurant.find(userId)
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword)
        || restaurant.category.toLowerCase().includes(keyword)
      )
    })
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

module.exports = router