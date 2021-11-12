const express = require("express");
const router = express.Router();

//route for going to homepage of the website
router.get('/', (req, res) => {
    res.render('mainhome');
});


//route to go to authority login page
router.get('/login_authority',(req,res)=>{
    res.render('authority_login');
})

//route to go to user register page
router.get('/user_register',(req,res)=>{
    res.render('user_register');
})

//route to go to authority register page
router.get('/authority_register',(req,res)=>{
    res.render('authority_register');
})

//route to go to user login page 
router.get('/login_user',(req,res)=>{
    res.render('user_login');
})


module.exports = router;