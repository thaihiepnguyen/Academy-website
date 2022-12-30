import coursesService from "../services/courses.service.js";
export default {
  findDetailOfCourse: async (req, res) => {
    //req.session.retUrl = req.originalUrl;
    const courseId = req.params.id;
    const data1 = await coursesService.findDetails(courseId);
    const reviews = await coursesService.getReviews(courseId);
    const isLogged = req.session.auth;
    //console.log(data1);
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
    });
  },
  sendReview: async (req, res) => {
    const { reviewContent } = req.body;
    const courseId = req.params.id;
    const userId = res.locals.user.id;
    coursesService.sendReviews(userId, courseId, reviewContent);
    const url = "http://localhost:3000" + "/details/" + courseId;
    res.redirect(url);
  },
};
