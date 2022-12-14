import express from 'express';
import { engine } from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.engine('hbs', engine({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', function (req, res) {
  // res.send('Hello World.');
  res.send('Hello');
})
app.get('/login', function (req, res) {
  res.render('vwlogin/login.hbs');
})

app.get('/signup', function (req, res) {
  res.render('vwSignup/signup.hbs');
})

//app.get('/login', function (req, res) {
//  const __dirname = dirname(fileURLToPath(import.meta.url));
//  res.sendFile(__dirname + '/views/layouts/bs4');
//})

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-Commerce App listening at http://localhost:${PORT}`);
});
