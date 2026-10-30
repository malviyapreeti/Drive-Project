
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const connectToDB = require('./config/db');

const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
const uploadRouter = require('./routes/upload.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REQUEST LOGGER
app.use((req, res, next) => {
    console.log('REQUEST RECEIVED:', req.method, req.url);
    next();
});

// ROUTES
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/', uploadRouter);

// SERVER
app.listen(4000, '127.0.0.1', () => {
    console.log('Server is running on http://127.0.0.1:4000');
    connectToDB();
});
