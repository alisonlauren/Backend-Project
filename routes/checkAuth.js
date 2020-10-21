const express = require('express');

const checkAuth = async (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        req.session.returnUrl = req.originalUrl
        console.log('\n\nPrevented Access');
        console.log('original URL ' , req.originalUrl);
        console.log('Session saved URL ', req.session.returnUrl);
        req.session.save((e)=>{
            if(e){
                console.log(e);
            }
            console.log('\n\nSESSION IS SAVED\n\n')
            res.redirect(`/login`);
        })
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