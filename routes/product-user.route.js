import express from "express";
//import productService from "../services/product.service.js";
//import productUserRoute from "./routes/product-user.route.js";

const router = express.Router();
router.get("/detail", function (req, res) {
  res.render("vwProduct/detail.hbs");
});
export default router;
signup.hbs