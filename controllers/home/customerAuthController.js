const customerModel = require("../../models/customerModel");
const { responseReturn } = require("../../utils/response");
const brypt = require("bcrypt");
const sellerCustomerModel = require("../../models/sellerCustomerModel");

class customerAuthController {
  customer_register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email already exists" });
      } else {
        const createCustomer = await customerModel({
          name: name.trim(),
          email: email.trim(),
          password: await brypt.hash(password, 10),
          method: "manually",
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
      }
    } catch (error) {
      
    }
  };
  //end method
}

module.exports = new customerAuthController();
