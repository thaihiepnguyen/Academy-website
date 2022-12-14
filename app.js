import express from 'express';
import { engine } from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const port = 3000;


app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', (req, res) => {
	res.send('Hi, hiep still exists.');
})

app.get('/login', function (req, res) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  res.sendFile(__dirname + '/views/vwlogin/login.html');
})
app.listen(port, () => {
	console.log(`app is running on localhost:${port}`);
})



