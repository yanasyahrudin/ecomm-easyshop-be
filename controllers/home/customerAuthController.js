class customerAuthController {
    customer_register(req, res) {
        console.log(req.body)   
    }
}

module.exports = new customerAuthController()