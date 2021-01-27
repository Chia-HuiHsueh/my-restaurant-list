const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/name/AtoZ', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/name/ZtoA', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/category/AtoZ', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/category/ZtoA', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/rating/ascending', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/rating/descending', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})



module.exports = router