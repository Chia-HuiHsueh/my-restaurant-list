const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sorts = require('./modules/sorts')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/sorts', authenticator, sorts)
router.use('/users', users)
router.use('/', authenticator, home, search)

module.exports = router