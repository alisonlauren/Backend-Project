const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    res.render('register', {
        locals: {
            error: null,
            title: "Register",
        },
        partials: {
            head:"partials/head", 
            footer: "partials/footer"
        },
    });
})

router.post('/', (req, res) => {
    //check if post was submitted with email and password
    if (!req.body.email || !req.body.password || !req.body.fullName) {
        res.render('register', {
            locals: {
                error: "Please submit all required fields",
                title: "Register"
            },
            partials: {
                head: "partials/head",
                footer: "partials/footer"
            }
        })
        return;
    }
    const { email, password, fullName } = req.body;
    console.log(email, password, fullName);
    bcrypt.hash(password, 10, (err, hash) => {
        db.User.create({
            name: fullName,
            email: email,
            password: hash
        })
        .then((user) => {
            res.redirect('login');
        })
        .catch((e)=>{
            res.render('register', {
                locals: {
                    error: e,
                    title: "Register"
                },
                partials: {
                    head: 'partials/head',
                    footer: 'partials/footer'
                }
            })
        })
    })
})

module.exports = router;