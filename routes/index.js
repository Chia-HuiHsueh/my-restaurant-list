const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sorts = require('./modules/sorts')
const users = require('./modules/users')

router.use('/users', users)
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/', search)
router.use('/sorts', sorts)

module.exports = router