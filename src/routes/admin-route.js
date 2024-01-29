const express = require("express");

const router = express.Router();
const adminController = require("../controllers/admin-controller");
const upload = require("../middlewares/uploads")
router.post(
    "/product",
    upload.array("image",5),
    adminController.createProduct
)
router.post("/product", adminController.createProduct);
router.post("/category", adminController.createCategory);
router.post("/brand", adminController.createBrand);
router.post("/promotion", adminController.createPromotion);
router.patch("/product/:productId", adminController.updateProduct);

module.exports = router;
