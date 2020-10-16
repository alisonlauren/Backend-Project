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
    const { workoutType, startTime, endTime, calorie, miles } = req.body;
    if ( !workoutType || !startTime || !endTime || !calorie || !miles){
        res.render('dashboard', {
            locals: {
                user: req.session.user,
                error: "Please submit all required fields",
                title: "Dashboard"
            },
            partials: {
                head: "partials/head",
                footer: "partials/footer"
            }
        })
        return;
    }
    db.Workout.create({
        type: workoutType,
        data: {
            distance: miles
        },
        start_time: startTime,
        end_time: endTime,
        cal: calorie,
        UserId: req.session.user.id,
    })
    .then(newWorkout=>{
        res.redirect('/dashboard');
    })
    .catch(e=>{
        res.status(500).json({error: "A database error occurred"});
    })
})

module.exports = router;