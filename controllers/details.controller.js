import coursesService from "../services/courses.service.js";
import userService from "../services/user.service.js";
export default {
  findDetailOfCourse: async (req, res) => {
    //req.session.retUrl = req.originalUrl;
    const courseId = req.params.id;
    const user = res.locals.user;

    const data1 = await coursesService.findDetails(courseId);
    const reviews = await coursesService.getReviews(courseId);
    const isLogged = req.session.auth;
    const data2 = await coursesService.getClips(courseId);
    const courses = await userService.checkCourseInWatchList(user.id, courseId);

    if(courses.length > 0) {
      courses.check = true;
    }

    for (let i = 0; i < data2.length; i++) {
      data2[i].source = "/details/" + courseId + "/" + data2[i].id;
      console.log(data2[i].source);
    }
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
      courses,
      courseId
    });
  },

  sendReview: async (req, res) => {
    const { rate, reviewContent } = req.body;
    console.log(reviewContent);
    console.log(rate);
    const courseId = req.params.id;
    const userId = res.locals.user.id;
    if(userId != null) {
      await coursesService.sendReviews(userId, courseId, reviewContent, rate);
    }
    // const url = "http://localhost:3000" + "/details/" + courseId;
    const url = "/details/" + courseId;
    res.redirect(url);
  },

  viewClip: async (req, res) => {
    const courseId = req.params.courseId;
    const videoId = req.params.videoId;
    const thisVideo = await coursesService.findVideoForCourse(
      courseId,
      videoId
    );
    console.log(thisVideo);
    res.render("vwProduct/viewClip.hbs", {
      isDefault: true,
      videoData: thisVideo,
    });
  },
};
