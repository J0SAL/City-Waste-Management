const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('mainhome');
});

router.get('/login_authority',(req,res)=>{
    res.render('authority_login');
})

router.get('/user_register',(req,res)=>{
    res.render('user_register');
})


router.get('/authority_register',(req,res)=>{
    res.render('authority_register');
})


router.get('/login_user',(req,res)=>{
    res.render('user_login');
})


module.exports = router;