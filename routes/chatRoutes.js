const chatControllers = require("../controllers/chat/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post(
  "/chat/customer/add-customer-friend",
  chatControllers.add_customer_friend
);

router.post(
  "/chat/customer/customer-message-add",
  chatControllers.customer_message_add
);

module.exports = router;
