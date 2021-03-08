const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  const sorts = req.query.sorts
  const selection = [
    { value: 'name', selected: '名稱 A -> Z' },
    { value: '-name', selected: '名稱 Z -> A' },
    { value: 'category', selected: '類別 A -> Z' },
    { value: '-category', selected: '類別 Z -> A' },
    { value: '-rating', selected: '評比高至低' },
    { value: 'rating', selected: '評比低至高' },]
  const currentSelected = selection.find(selection => sorts === selection.value).selected
  Restaurant.find({ userId })
    .lean()
    .sort(sorts)
    .then(restaurants => res.render('index', { restaurants, sorts, currentSelected }))
    .catch(() => { res.sendStatus(404) })
})

module.exports = router