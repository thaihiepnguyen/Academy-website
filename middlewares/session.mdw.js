import session from 'express-session';

export default function (app) {
    app.set('trust proxy', 1);
    app.use(session({
        secret: 'SECRET_KEY',
        resave: false,
        saveUninitialized: true,
        cookie: {
            // secure: true <-- Khi nào sử dụng https:// mới mở.
        }
    }));
}

