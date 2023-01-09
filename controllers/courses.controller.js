import coursesService from "../services/courses.service.js";
import userService from "../services/user.service.js";

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
    // lấy key
    let key = req.query.key;
    req.session.key= key;

    console.log("Fulltext");
    console.log(key);


    // lấy rating
    let ratings = req.query.radios;
    req.session.ratings = ratings;

    //lấy sort
    let sort = req.query.sort;
    console.log(sort);

    // lấy key bị mất ở session
    if (typeof key == "undefined") {
      key = res.locals.key;
      req.session.key= key;
    }

    // lấy rating bị mất ở session
    if (typeof ratings == "undefined") {
      ratings = res.locals.ratings;
      req.session.ratings= ratings;
    }

    const curPage = req.query.page || 1;

    const limit = 3;

    const offset = (curPage - 1) * limit;

    let total = await coursesService.countByFullTextSearch(key);

    let courses = await coursesService.findByFullTextSearch(key, limit, offset);

    if (typeof ratings !== "undefined") {
      total = await coursesService.countFilterByRating(key, ratings);
      courses = await coursesService.filterCoursesByRating(key, ratings, limit, offset);
    }

    if(sort === "decreasing_rated") {
      key = req.session.key;
      total = await  coursesService.countSortDecreasingRated(key);
      courses = await coursesService.sortDecreasingRated(key, limit, offset);
    }

    if (sort === "ascending_priced") {
      key = req.session.key;
      total = await coursesService.countSortAscendingPriced(key);
      courses = await coursesService.sortAscendingPriced(key, limit, offset);
    }

    const nPages = Math.ceil(total / limit);



    let isEnableNext = null;
    let isEnablePrevious = null;

    if (+curPage !== nPages) {
      isEnableNext = {
        next: +curPage + 1,
        key: key,
        ratings: ratings,
        sort: sort
      };
    }

    if (+curPage !== 1) {
      isEnablePrevious = {
        previous: +curPage - 1,
        key: key,
        ratings: ratings,
        sort: sort
      };
    }

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
      pageNumbers.push({
        value: i,
        isCurrent: i === +curPage,
        key: key,
        ratings: ratings,
        sort: sort
      });
    }
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
      ratings: ratings,
      key: key
    });
  },

  getDetailPage: async (req, res) => {
    const id = req.params.id;

    const user = res.locals.user;

    const courses = await coursesService.findCoursesById(id);
    const clips = await coursesService.findClipByCoursesId(id);

    res.render('vwProduct/details.hbs', {
      courses: courses,
      clips: clips,
      isDefault: true
    })
  },

  filterCoursesByRating: async (req, res) => {
    const rating = req.body.radios;
    const curPage = req.query.page || 1;
    const limit = 3;
    const offset = (curPage - 1) * limit;

    const total = await coursesService.countFilterByRating(rating);
    const nPages = Math.ceil(total / limit);

    let isEnableNext = null;
    let isEnablePrevious = null;
    // console.log(isEnableNext);
    if (+curPage !== nPages) {
      isEnableNext = {
        next: +curPage + 1,
        ratings: ratings,
      };
    }

    if (+curPage !== 1) {
      isEnablePrevious = {
        previous: +curPage - 1,
        ratings: ratings,
      };
    }

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
      pageNumbers.push({
        value: i,
        isCurrent: i === +curPage,
        ratings: ratings
      });
    }

    const courses = await coursesService.filterCoursesByRating(rating,limit,offset);
    if(courses == null) {
      return res.render("vwProduct/courses", {
        activeTagbarLayout: true,
        warning: `Can not find any courses of ${rating}`,
      });
    }

    res.render("vwProduct/courses", {
      activeTagbarLayout: true,
      courses,
      isEnableNext,
      isEnablePrevious,
      pageNumbers,
    });
  }
};
