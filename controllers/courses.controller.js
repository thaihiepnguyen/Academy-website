import coursesService from "../services/courses.service.js";
import * as constants from "constants";

export default {
  findByCatId: async (req, res) => {
    req.session.retUrl = req.originalUrl;
    const CatId = req.params.id;

    const courses = await coursesService.findByCatId(CatId);

    const categories = res.locals.categories;
    let catName = "";
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id == CatId) {
        catName = categories[i].name;
      }
    }

    if (courses == null) {
      res.render("vwProduct/courses", {
        catName,
        activeTagbarLayout: true,
        warning: `Can not find any courses of ${catName}`,
      });
      return;
    }

    for (let i = 0; i < courses.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < courses[i].rating; j++) {
        ratings[j] = "rating-color";
      }
      courses[i].ratings = ratings;
    }

    // console.log(courses[0]);

    res.render("vwProduct/courses", {
      activeTagbarLayout: true,
      courses,
      catName,
    });
  },

  findTop5Courses: async (req, res) => {
    return coursesService.findTop5Courses();
  },

  fullTextSearch: async (req, res) => {
    //
    let key = req.query.key;
    const curPage = req.query.page || 1;
    //
    // if(key.length !== 0) {
    //     req.session.key = key;
    // }

    const limit = 2;

    const offset = (curPage - 1) * limit;

    const total = await coursesService.countByFullTextSearch(key);
    const nPages = Math.ceil(total / limit);

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
      pageNumbers.push({
        value: i,
        isCurrent: i === +curPage,
        key: key,
      });
    }

    const courses = await coursesService.findByFullTextSearch(
      key,
      limit,
      offset
    );
    let catName = "";

    if (courses == null) {
      return res.render("vwProduct/courses", {
        activeTagbarLayout: true,
        warning: `Can not find any courses of ${key}`,
      });
    }

    res.render("vwProduct/courses", {
      activeTagbarLayout: true,
      courses,
      pageNumbers: pageNumbers,
    });
  },
};
