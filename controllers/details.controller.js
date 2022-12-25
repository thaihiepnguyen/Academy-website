export default {
  findDetailOfCourse: async (req, res) => {
    //req.session.retUrl = req.originalUrl;
    const courseId = req.params.id;
    console.log("controller ne");
    res.render("vwProduct/test.hbs", { isDefault: true });
  },
};
