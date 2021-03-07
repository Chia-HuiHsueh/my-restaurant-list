const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/name/asc', (req, res) => {
  const userId = req.user._id
  Restaurant.find(userId)
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/name/desc', (req, res) => {
  const userId = req.user._id
  Restaurant.find(userId)
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/category/asc', (req, res) => {
  Restaurant.find(userId)
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/category/desc', (req, res) => {
  Restaurant.find(userId)
    .lean()
    .sort({ category: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/rating/ascending', (req, res) => {
  Restaurant.find(userId)
    .lean()
    .sort({ rating: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/rating/descending', (req, res) => {
  Restaurant.find(userId)
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})


module.exports = router