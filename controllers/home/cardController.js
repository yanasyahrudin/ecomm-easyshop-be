const cardModel = require("../../models/cardModel");
const {responseReturn} = require("../../utiles/response");
const {mongo: {ObjectId}} = require("mongoose");
class cardController {
  add_to_card = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const product = await cardModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });

      if (product) {
        responseReturn(res, 404, { error: "Product Already Added To Card " });
      } else {
        const product = await cardModel.create({
          userId,
          productId,
          quantity,
        });
        responseReturn(res, 201, {
          message: "Product Added To Card Successfully",
          product,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //end method

  get_card_product = async (req, res) => {
    const { userId } = req.params;
    
    try {
      const card_products = await cardModel.aggregate([
        {
          $match: {
            userId: new Object(userId),
          },
        },
      ]);
      console.log(card_products);

    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new cardController();
