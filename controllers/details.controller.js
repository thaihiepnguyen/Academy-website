import coursesService from "../services/courses.service.js";
export default {
  findDetailOfCourse: async (req, res) => {
    //req.session.retUrl = req.originalUrl;
    const courseId = req.params.id;
    const data1 = await coursesService.findDetails(courseId);
    const reviews = await coursesService.getReviews(courseId);
    const isLogged = req.session.auth;
    const data2 = await coursesService.getClips(courseId);
    const highestCourses = await coursesService.findHigestCourse(courseId);
    let data3 = null;
    if (res.locals.user != null) {
      data3 = await coursesService.rollInThis(res.locals.user.id, courseId);
    }
    let show = true;
    if (data3) {
      show = false;
    }
    console.log(show);
    let ratings = [false, false, false, false, false];
    for (let j = 0; j < data1[0].rating; j++) {
      ratings[j] = true;
    }
    data1[0].stars = ratings;
    res.render("vwProduct/detail.hbs", {
      isDefault: true,
      basicInfo: data1,
      logged: isLogged,
      reviewsList: reviews,
      videosL: data2,
      courseId,
      show,
    });
  },
  sendReview: async (req, res) => {
    const { reviewContent } = req.body;
    const courseId = req.params.id;
    const userId = res.locals.user.id;
    coursesService.sendReviews(userId, courseId, reviewContent);
    // const url = "http://localhost:3000" + "/details/" + courseId;
    const url = "/details/" + courseId;
    res.redirect(url);
  },
};
