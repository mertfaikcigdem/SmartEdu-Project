const express = require('express');

const app = express();

const port = 3000;

// template engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
 res.status(200).render('index', {
  page_name: 'index'
 });
});

app.get('/about', (req, res) => {
 res.status(200).render('about', {
  page_name: 'about'
 });
});

app.listen(port, () => {
 console.log(`App started on port ${port}`);
});