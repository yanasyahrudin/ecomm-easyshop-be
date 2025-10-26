const chatControllers = require("../controllers/chat/chatControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post(
  "/chat/customer/add-customer-friend",
  chatControllers.add_customer_friend
);

module.exports = router;
