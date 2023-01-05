import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import morgan from "morgan";
import viewMdw from "./middlewares/view.mdw.js";
import localsMdw from "./middlewares/locals.mdw.js";
import routesMdw from "./middlewares/routes.mdw.js";
import sessionMdw from "./middlewares/session.mdw.js";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(morgan('tiny'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

sessionMdw(app);
localsMdw(app);
viewMdw(app);
routesMdw(app);


app.listen(PORT, function () {
  console.log(`E-Commerce App listening at http://localhost:${PORT}`);
});
