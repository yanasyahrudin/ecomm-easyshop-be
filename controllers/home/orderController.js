const cardModel = require("../../models/cardModel");
const { responseReturn } = require("../../utiles/response");

class orderController {
  place_order = async (req, res) => {
    console.log(req.body);
    try {
    } catch (error) {
      console.log(error.message);
    }
  };
  //end method
}

module.exports = new orderController();
