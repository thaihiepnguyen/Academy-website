import express from "express";

const app = express();

const port = 3000;



app.get('/', (req, res) => {
	res.send('Hi, hiep still exists.');
})


app.listen(port, () => {
	console.log(`app is running on localhost:${port}`);
})



