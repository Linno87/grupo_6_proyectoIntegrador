const express = require("express");
const {
  carrito,
  detalle,
  add,
  createProduct,
  products,
  editProduct,
  updateProduct, 
  deleteProduct,
} = require("../controllers/productsController");
const upload = require("../middlewares/upload");
const productAddValidator = require("../validations/productAddValidator");
const router = express.Router();

/* /products */
router.get("/", products);
router.get("/carrito", carrito);

router.get("/createProduct", add);
router.post(
  "/createProduct",
  upload.fields([
    {
      name: "image",
    },
    {
      name: "images",
    },
  ]),
  productAddValidator,
  createProduct
);
router.get("/editProduct/:id", editProduct);
router.put(
  "/editProduct/:id",
   upload.fields([
    {
      name: "image"
    },
    {
      name: "images"
    }
  ]), 
  updateProduct
);
router.get("/detalle/:id", detalle);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
