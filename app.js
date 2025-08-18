const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const port = 3000;

// connect db
mongoose.connect('mongodb+srv://mertfaikcigdem:mbgZ7Zubs07zyXpb@cluster0.irpfyrq.mongodb.net/smartedu-db')
.then(() => {
  console.log('MongoDB connection successful');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// template engine
app.set('view engine', 'ejs');

// global varaible

global.userId = null;

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-secret-cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://mertfaikcigdem:mbgZ7Zubs07zyXpb@cluster0.irpfyrq.mongodb.net/smartedu-db' })
}));

// routes
app.use("*", (req, res, next) => {
  userId = req.session.userId;
  next();
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
 console.log(`App started on port ${port}`);
});