const express = require('express');
const router = express.Router();
const db = require('../models');

const checkAuth = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.render('login', {
            locals: {
                title: 'Login',
                error: 'Must be logged in to access profile page'
              },
              partials: {
                head: 'partials/head',
                footer: 'partials/footer'
              }
        });
    }
}

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
    const {title, description, workoutType, startTime, endTime, calorie, miles} = req.body
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
        .then(user=>{
            user.createChallenge({
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
            })
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