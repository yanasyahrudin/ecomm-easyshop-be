const homeController = require("../../controllers/home/homeController");
const router = require("express").Router();

router.get("/get-categorys", homeController.get_categorys);
router.get("/get-products", homeController.get_products);
router.get("/price-range-latest-product", homeController.price_range_product);
router.get("/query-products", homeController.query_products);
router.get("/product-details/:slug", homeController.product_details);
router.post("/customer/submit-review", homeController.submit_review);

module.exports = router;
