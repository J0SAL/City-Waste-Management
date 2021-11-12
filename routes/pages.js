const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('mainhome');
});
router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/contact', (req, res) => {
    res.render('contact');
});
router.get('/authority', (req, res) => {
    res.render('authority');
});
router.get('/user', (req, res) => {
    res.render('user');
});

module.exports = router;