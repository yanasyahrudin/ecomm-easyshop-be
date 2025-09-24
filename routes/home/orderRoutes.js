const orderController = require('../../controllers/home/orderController')
const router = require('express').Router()

router.post('/home/order/place_order', orderController.place_order)


module.exports = router