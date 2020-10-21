const express = require('express');

const checkAuth = async (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        req.session.returnUrl = req.originalUrl
        res.redirect(`/login`);
        // await res.render('login', {
        //     locals: {
        //         title: 'Login',
        //         error: 'Must be logged in to access profile page'
        //       },
        //       partials: {
        //         head: 'partials/head',
        //         footer: 'partials/footer'
        //       }
        // });
    }
}

module.exports = checkAuth;