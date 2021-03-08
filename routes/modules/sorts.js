const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  const sorts = req.query.sorts
  Restaurant.find({ userId })
    .lean()
    .sort(sorts)
    .then(restaurants => res.render('index', { restaurants, sorts }))
    .catch(error => console.log(error))
})

module.exports = router