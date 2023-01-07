import coursesService from "../services/courses.service.js";

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

    const limit = 2;

    const offset = (curPage - 1) * limit;

    const total = await coursesService.countByFullTextSearch(key);
    const nPages = Math.ceil(total / limit);


    let isEnableNext = null;
    let isEnablePrevious = null;
    // console.log(isEnableNext);
    if (+curPage !== nPages) {
      isEnableNext = {
        next: +curPage + 1,
        key: key,
      };
    }

    if (+curPage !== 1) {
      isEnablePrevious = {
        previous: +curPage - 1,
        key: key,
      };
    }

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
      isEnableNext,
      isEnablePrevious,
      pageNumbers,
    });
  },

  getDetailPage: async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const courses = await coursesService.findCoursesById(id);

    console.log(courses);
    res.render('vwProduct/details.hbs', {
      courses: courses,
      isDefault: true
    })
  }
};
