import express from "express";
//import productUserRoute from "./routes/product-user.route.js";
import productService from "../services/product.service.js";

const router = express.Router();
router.get("/detail", async function (req, res) {
  const list = await productService.findGeneralData();
  res.render("vwProduct/detail.hbs", {
    basicInfo: list,
  });
});

export default router;
