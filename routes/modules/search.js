const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
//set search bar
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword)
        || restaurant.category.toLowerCase().includes(keyword)
      )
    })
    .then(restaurants => {
      if (!restaurants.length) {
        const search_msg = `您所輸入的『${keyword}』沒有結果，請檢查看看有無錯別字或試試以其他關鍵字搜尋。`
        return res.render('index', { restaurants, search_msg })
      }
      return res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router