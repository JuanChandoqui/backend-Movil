const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.send('register.html', {root : './public'});
});

router.get('/login', (req, res) => {
    res.send('login.html', {root : './public/'});
});

module.exports = router;