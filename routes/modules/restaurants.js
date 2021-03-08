const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/create', (req, res) => {
  return res.render('create')
})

//create new restaurant
router.post('/', (req, res) => {
  const restaurantObj = req.body
  restaurantObj['userId'] = req.user._id
  if (req.body.image.length === 0) { req.body.image = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png' }
  if (req.body.menu.length === 0) { req.body.menu = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png' }
  return Restaurant.create(restaurantObj)
    .then(() => res.redirect('/'))
    .catch(() => { res.sendStatus(404) })
})

//show restaurant detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(() => { res.sendStatus(404) })
})

//restaurant detail edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', restaurant))
    .catch(() => { res.sendStatus(404) })
})
//update restaurant new edit
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  if (req.body.image.length === 0) { req.body.image = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png' }
  if (req.body.menu.length === 0) { req.body.menu = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png' }
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(() => { res.sendStatus(404) })
})

//delete restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(() => { res.sendStatus(404) })
})


module.exports = router