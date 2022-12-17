export default function (app) {
  app.use(function (req, res) {
    res.status(404).render('404', {
      layout: false
    });
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('500', {
      layout: false,
      stack: err.stack
    });
  });
}