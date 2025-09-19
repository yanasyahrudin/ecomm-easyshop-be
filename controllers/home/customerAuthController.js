const customerModel = require("../../models/customerModel");
const { responseReturn } = require("../../utiles/response");
const brypt = require("bcrypt");
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const { createToken } = require("../../utiles/tokenCreate");
class customerAuthController {
  customer_register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email already exists" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await brypt.hash(password, 10),
          method: "manually",
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, {
          message: "User Register Successfully",
          token,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //end method

  customer_login = async (req, res) => {
    console.log(req.body);
  }
  //end method
}

module.exports = new customerAuthController();
