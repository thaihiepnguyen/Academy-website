import express from 'express';
import activate_view from './middlewares/view.mdw.js';
import activate_route from './middlewares/routes.mdw.js';
import activate_resLocals from './middlewares/locals.mdw.js';
import activate_session from './middlewares/session.mdw.js'
import activate_error from './middlewares/error.mdw.js'
import morgan from 'morgan';

const app = express();

app.use('/public', express.static('public'));
app.use(morgan('dev'))
app.use(express.urlencoded({
  extended: true
}));

activate_session(app);
activate_resLocals(app);
activate_view(app);
activate_route(app);
activate_error(app);

const PORT = 3000;

app.listen(PORT, function(){
	console.log(`app listening on http://localhost:${PORT}`);
})


