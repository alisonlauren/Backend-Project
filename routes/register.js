const express = require('express');
const router = express.Router();
const db = require('../models');


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
if (!req.body.email || !req.body.password) {
    res.render('register', {
        locals: {
            error: "Please submit all required fields"
        }
    })
    return;
}
const { email, password } = req.body;
bcrypt.hash(password, 10, (err, hash) => {
    db.User.create({
        email: email,
        password: hash,
    })
    .then((user) => {
        res.redirect('/login');
    })
})
})



module.exports = router