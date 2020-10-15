const express = require('express');
const router = express.Router();
const db = require('../models');

const checkAuth = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.redirect('/login');
    }
}

router.get('/', checkAuth, (req, res)=>{
    res.render('dashboard', {
        locals: {
            user: req.session.user,
            title: "DashBoard",
            error: ''
        },
        partials: {
            head:"partials/head",
            footer: "partials/footer"
        }
    })
})

router.post('/', (req, res)=>{

})

module.exports = router;