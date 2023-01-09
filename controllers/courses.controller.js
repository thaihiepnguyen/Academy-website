import coursesService from "../services/courses.service.js";
import userService from "../services/user.service.js";

export default {
  findByCatId: async (req, res) => {
    req.session.retUrl = req.originalUrl;
    let catID = req.query.cat_id;
    req.session.catID= catID;

    console.log(catID);

    const curPage = req.query.page || 1;

    const limit = 3;

    const offset = (curPage - 1) * limit;

    console.log("hallo");

    const total = await coursesService.countFindByCatId(catID);

    console.log(total);

    const courses = await coursesService.findByCatId(catID, limit, offset);

    const categories = res.locals.categories;
    let catName = "";
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id == catID) {
        catName = categories[i].name;
      }
    }

    const nPages = Math.ceil(total / limit);

    let isEnableNext = null;
    let isEnablePrevious = null;

    if (+curPage !== nPages) {
      isEnableNext = {
        next: +curPage + 1,
        catID: catID
      };
    }

    if (+curPage !== 1) {
      isEnablePrevious = {
        previous: +curPage - 1,
        catID: catID
      };
    }

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
      pageNumbers.push({
        value: i,
        isCurrent: i === +curPage,
        catID: catID
      });
    }

    if (courses == null) {
      res.render("vwProduct/categories", {
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

    res.render("vwProduct/categories", {
      activeTagbarLayout: true,
      isEnableNext,
      isEnablePrevious,
      pageNumbers,
      courses,
      catName
    });
  },

  findByTopicId: async (req, res) => {
    req.session.retUrl = req.originalUrl;
    let catID = req.query.cat_id;
    req.session.catID= catID;

    let topicID = req.query.topic_id;
    req.session.topicID= topicID;

    const curPage = req.query.page || 1;

    const limit = 3;

    const offset = (curPage - 1) * limit;

    const total = await coursesService.countFindByTopicId(catID, topicID);

    const courses = await coursesService.findByTopicId(catID, topicID, limit, offset);

    // const categories = res.locals.categories;
    let catName = "";
    // for (let i = 0; i < categories.length; i++) {
    //   if (categories[i].id == catID) {
    //     catName = categories[i].name;
    //   }
    // }

    const nPages = Math.ceil(total / limit);

    let isEnableNext = null;
    let isEnablePrevious = null;

    if (+curPage !== nPages) {
      isEnableNext = {
        next: +curPage + 1,
        catID: catID
      };
    }

    if (+curPage !== 1) {
      isEnablePrevious = {
        previous: +curPage - 1,
        catID: catID
      };
    }

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
      pageNumbers.push({
        value: i,
        isCurrent: i === +curPage,
        catID: catID
      });
    }

    if (courses == null) {
      res.render("vwProduct/categories", {
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

    res.render("vwProduct/categories", {
      activeTagbarLayout: true,
      isEnableNext,
      isEnablePrevious,
      pageNumbers,
      courses,
      catName
    });
  },

  findTop5Courses: async (req, res) => {
    return coursesService.findTop5Courses();
  },

  findTop3Courses: async (req, res) => {
    return coursesService.findTop3Courses();
  },

  findTop10CoursesByView: async (req, res) => {
    return coursesService.findTop10CoursesByView();
  },

  fullTextSearch: async (req, res) => {
    // lấy key
    let key = req.query.key;
    req.session.key= key;

    // lấy rating
    let ratings = req.query.ratings; // vd
    req.session.ratings = ratings;

    //lấy sort
    let sort = req.query.sort;

    if (typeof key == "undefined") {
      key = res.locals.key;
      req.session.key= key;
    }

    if (typeof ratings == "undefined") {
      ratings = res.locals.ratings;
      req.session.ratings= ratings;
    }

    const curPage = req.query.page || 1;

    const limit = 3;

    const offset = (curPage - 1) * limit;

    let total = await coursesService.countByFullTextSearch(key);

    let courses = await coursesService.findByFullTextSearch(key, limit, offset);

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

    if (typeof ratings !== "undefined") {
      total = await coursesService.countFilterByRating(key, ratings);
      courses = await coursesService.filterCoursesByRating(key, ratings, limit, offset);

      if(typeof sort !== 'undefined') {
        if(sort === "decreasing_rated") {
          key = req.session.key;
          total = await  coursesService.countSortDecreasingRatedWithRatings(key, ratings);
          courses = await coursesService.sortDecreasingRatedWithRatings(key, ratings, limit, offset);
        }

        if (sort === "ascending_priced") {
          key = req.session.key;
          total = await coursesService.countSortAscendingPricedWithRatings(key, ratings);
          courses = await coursesService.sortAscendingPricedWithRatings(key, ratings, limit, offset);
        }
      }
    }

    if (courses.length === 0) {
      return res.render("vwProduct/courses", {
        activeTagbarLayout: true,
        warning: `Can not find any courses of ${key}`,
      });
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

    let maxView = 0 ;
    let mostInterested = null;

    for (let i = 0; i < courses.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < courses[i].rating; j++) {
        ratings[j] = "rating-color"; // rating-color is a css class.
      }
      courses[i].ratings = ratings;
      if(courses[i].rating == 5) {
        courses[i].highest_rated = true;
      }
      if(courses[i].views > maxView) {
        maxView = courses[i].views;
        mostInterested = i;
      }
    }

    courses[mostInterested].most_interested = true;

    let catName = 'Find ' + total + ' results for ' + key;

    res.render("vwProduct/courses", {
      //activeTagbarLayout: true,
      isDefault: true,
      courses,
      isEnableNext,
      isEnablePrevious,
      pageNumbers,
      ratings: ratings,
      key: key,
      catName
    });
  },

  getDetailPage: async (req, res) => {
    const id = req.params.id;

    const user = res.locals.user;

    const courses = await coursesService.findCoursesById(id);
    const clips = await coursesService.findClipByCoursesId(id);
    const lecture = await userService.findById(courses.lecture_id);
    const coursesOfLecture = await coursesService.findCoursesByLectureId(lecture.id);
    const coursesTop5 = await coursesService.findTop5CoursesSameCategory(courses.category_id);

    for (let i = 0; i < coursesOfLecture.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < coursesOfLecture[i].rating; j++) {
        ratings[j] = "rating-color"; // rating-color is a css class.
      }
      coursesOfLecture[i].ratings = ratings;
      if(user != null) {
        const isActive = await userService.checkCourseInWatchList(user.id, coursesOfLecture[i].id);
        const isEnrolled = await userService.checkEnroll(user.id, coursesOfLecture[i].id);
        if (isActive.length > 0) {
          coursesOfLecture[i].check = true;
        }
      }
    }

    for (let i = 0; i < coursesTop5.length; i++) {
      let ratings = ["", "", "", "", ""];
      for (let j = 0; j < coursesTop5[i].rating; j++) {
        ratings[j] = "rating-color"; // rating-color is a css class.
      }
      coursesTop5[i].ratings = ratings;
      if(user != null) {
        const isActive = await userService.checkCourseInWatchList(user.id, coursesTop5[i].id);
        const isEnrolled = await userService.checkEnroll(user.id, coursesTop5[i].id);
        if (isActive.length > 0) {
          coursesTop5[i].check = true;
        }
      }
    }

    res.render('vwProduct/details.hbs', {
      courses: courses,
      clips: clips,
      lecture: lecture,
      coursesOfLecture: coursesOfLecture,
      coursesTop5: coursesTop5,
      isDefault: true
    })
  },

  enrollCourses: async (req, res) => {
    console.log("Hello")
    const user  = req.session.authUser;
    const id = req.params.id;
    console.log("Hello")
    console.log(user.id)

    console.log("Hello 2")
    console.log(req.params)
    if (user === null) {
      res.redirect('/account/signup/');
      return;
    }


    await coursesService.insertEnroll(user.id, id);

    res.redirect('/courses/detail/' + id);
  },

  pushView: async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await coursesService.pushView(id);

    res.redirect('/courses/detail/' + id);
  },
};
