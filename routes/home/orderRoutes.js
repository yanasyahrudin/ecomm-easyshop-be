const orderController = require('../../controllers/home/orderController')
const router = require('express').Router()

router.post('/home/order/place-order', orderController.place_order)
router.get('/home/coustomer/get-dashboard-data/:userId', orderController.get_customer_dashboard_data)
router.get('/home/coustomer/get-orders/:customerId/:status', orderController.get_orders)
module.exports = router