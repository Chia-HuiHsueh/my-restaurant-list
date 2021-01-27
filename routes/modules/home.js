const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//顯示所有餐廳到首頁
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})


module.exports = router