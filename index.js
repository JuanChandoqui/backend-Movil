const express = require('express');
const db = require('./routes/db_config');
const cookieParser = require('cookie-parser');
const port = 5000;
const app = express();

app.use('/js', express.static(__dirname + './public/js'));
app.use('/css', express.static(__dirname + './public/css'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookieParser());
app.use(express.json());

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
})
app.use('/', require('./routes/pages'));
app.use('/api', require('./controllers/auth'));
app.listen(port)