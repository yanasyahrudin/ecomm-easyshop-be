const authOrder = require("../../models/authOrder");
const customerOrder = require("../../models/customerOrder");
const moment = require("moment");
class orderController {
  place_order = async (req, res) => {
    const {price, products, shipping_fee, shoppingInfo, userId,} = req.body;
    let authorOrderData = []
    let cardId = []
    const tempDate = moment(Date.now()).format("LLL");
    console.log(tempDate);
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  //end method
}

module.exports = new orderController();
