const homeController = require("../../controllers/home/homeController");
const router = require("express").Router();

router.get("/get-categorys", homeController.get_categorys);
router.get("/get-products", homeController.get_products);



module.exports = router;
