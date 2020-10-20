const express = require('express');
const router = express.Router();
const db = require('../models');
const checkAuth = require('./checkAuth');

router.get('/', checkAuth, (req, res)=>{
    res.render('challenge', {
        locals: {
            user: req.session.user,
            title: "Challenges",
            error: ''
        },
        partials: {
            head:"partials/head",
            footer: "partials/footer"
        }
    })
})

router.post('/', (req, res)=>{
    const {title, description, publicOrPrivate, workoutType, startTime, endTime, calorie, miles} = req.body
    createObject = {
        type: workoutType,
        criteria: {
            title: title,
            description: description,
            start_time: startTime,
            end_time: endTime,
            cal: calorie,
            distance: miles
        },
        is_completed: false,
        is_public: false
    }
    if(publicOrPrivate === 'Public'){
        createObject.is_public = true;
    }
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
        .then(user=>{
            user.createChallenge(createObject)
            .then(challenge=>{
                res.redirect('./')
            })
            .catch(e=>{
                console.log(e);
            })
        })
        .catch(e=>{
            console.log(e)
        })
})

module.exports = router;