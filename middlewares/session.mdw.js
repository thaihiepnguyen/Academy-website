import fnKnexSessionStore from 'connect-session-knex';
import session from 'express-session';
import db from '../utils/db.js';
export default function (app) {
  const KnexSessionStore = fnKnexSessionStore(session);
  const store = new KnexSessionStore({
    knex: db
  });
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      // secure: true
    }
  }))
}