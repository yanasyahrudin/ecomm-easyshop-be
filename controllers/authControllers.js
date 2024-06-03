/** @format */

const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const { responseReturn } = require("../utiles/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utiles/tokenCreate");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success" });
        } else {
          responseReturn(res, 404, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End Method

  seller_register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
      const getUser = await sellerModel.findOne({
        email,
      });
      if (getUser) {
        responseReturn(res, 400, { error: "Email Already Exit" });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "manualy",
          shopInfo: {},
        });
        await sellerCustomerModel.create({
          myId: seller.id,
        });
        const token = await createToken({
          id: seller.id,
          roller: seller.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, {token, message: "Register Success" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  //end method

  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        console.log("Seller Info");
      }
    } catch (error) {
      console.log(error.message);
    }
  }; // End getUSer Method
}

module.exports = new authControllers();
