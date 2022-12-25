import coursesService from "../services/courses.service.js";
export default {
  findDetailOfCourse: async (req, res) => {
    //req.session.retUrl = req.originalUrl;
    const courseId = req.params.id;
    const data1 = await coursesService.findDetails(courseId);
    //console.log(data1);
    console.log("controller ne");
    res.render("vwProduct/detail.hbs", { isDefault: true, basicInfo: data1 });
  },
};