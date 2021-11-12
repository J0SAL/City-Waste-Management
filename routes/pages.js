const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('mainhome');
});


module.exports = router;