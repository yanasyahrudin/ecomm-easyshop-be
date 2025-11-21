const sellerModel = require("../../models/sellerModel");
const customerModel = require("../../models/customerModel");
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const { responseReturn } = require("../../utiles/response");

class ChatController {
  add_customer_friend = async (req, res) => {
    console.log(req.body);
    const { sellerId, userId } = req.body;
    try {
      if (sellerId !== "") {
        const seller = await sellerModel.findById(sellerId);
        const user = await customerModel.findById(userId);
        const checkSeller = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: userId,
              },
            },
            {
              myFriends: {
                $elemMatch: { fdId: sellerId },
              },
            },
          ],
        });
        if (!checkSeller) {
          await sellerCustomerModel.updateOne(
            { myId: userId },
            {
              $push: {
                myFriends: {
                  fdId: sellerId,
                  name: seller.shopInfo.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }
        const checkCustomer = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId,
              },
            },
            {
              myFriends: {
                $elemMatch: { fdId: userId },
              },
            },
          ],
        });
        if (!checkCustomer) {
          await sellerCustomerModel.updateOne(
            { myId: sellerId },
            {
              $push: {
                myFriends: {
                  fdId: userId,
                  name: user.name,
                  image: "",
                },
              },
            }
          );
        }

        const messages = await sellerCustomerModel.find({
          $or: [
            {
              $and: [
                {
                  receverId: { $eq: sellerId },
                },
                {
                  senderId: {
                    $eq: userId,
                  },
                },
              ],
            },
            {
              $and: [
                {
                  receverId: { $eq: userId },
                },
                {
                  senderId: {
                    $eq: sellerId,
                  },
                },
              ],
            },
          ],
        });
        const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
        const currentFd = MyFriends.myFriends.find(
          (fd) => fd.fdId.toString() === sellerId
        );
        return responseReturn(res, 200, {
          MyFriend: MyFriends.myFriends,
          currentFd,
          messages,
        });
      } else {
        const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
        responseReturn(res, 200, { MyFriend: MyFriends.myFriends });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_message_add = async (req, res) => {
    console.log(req.body);
    const { senderId, receverId, message, time } = req.body;
  }
}
module.exports = new ChatController();
