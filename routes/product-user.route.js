import express from "express";
// import productUserRoute from "./routes/product-user.route.js";
import productService from "../services/courses.service.js";

const router = express.Router();
router.get("/detail", async function (req, res) {
  const list = await productService.findGeneralData();
  const videoList = await productService.findClip();
  // const courseList = await productService.find5Course();
  const getReviews = await productService.findComments();
  res.render("vwProduct/detail.hbs", {
    isDefault: true,
    basicInfo: list,
    videosL: videoList,
    reviewsList: getReviews,
  });
});

export default router;
