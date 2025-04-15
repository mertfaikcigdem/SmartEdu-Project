const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoutes');

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

// middlewares
app.use(express.static('public'));

// routes
app.use('/', pageRoute);

app.listen(port, () => {
 console.log(`App started on port ${port}`);
});