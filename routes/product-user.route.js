import express from "express";
//import productUserRoute from "./routes/product-user.route.js";
import productService from "../services/product.service.js";

const router = express.Router();
router.get("/detail", async function (req, res) {
  const list = await productService.findGeneralData();
  const videoList = await productService.findClip();
  res.render("vwProduct/detail.hbs", {
    basicInfo: list,
    videosL: videoList,
  });
  //console.log(list);
  //console.log(videoList);
});

export default router;
