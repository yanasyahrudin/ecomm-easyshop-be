const homeController = require("../../controllers/home/homeController");
const router = require("express").Router();

router.get("/get-categorys", homeController.get_categorys);



module.exports = router;
