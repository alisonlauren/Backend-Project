const express = require('express');
const router = express.Router();
const db = require('../models');
const Op = require('sequelize');

// api route that returns a list of challenges that the user has listed into
router.get('/private', (req, res)=>{
    // req.query.sortBy ? const {sortBy} = req.query: null;
    // const {sortBy} = req.query;
    const {workoutType} = req.query;

    let whereStatement = {
        where: {
            is_completed: false,
        }
    }

    if(workoutType !== 'Running' && workoutType !== 'Cycling' && workoutType !== 'All'){
        res.status(404).json({error: 'Invalid workout type'})
    }
    // Ternary that checks if the workout type is all, if it isn't then the workout type is 
    // added to the where statement in the SQL Select call below.
    (workoutType !== 'All') ? (whereStatement['type'] = {[Op.iLike]: workoutType}) : null;

    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
    .then(user=>{
        user.getChallenges(whereStatement)
        .then(challenges => {
            if(challenges.length === 0){
                res.status(404).json({error: `No ${workoutType.toLowerCase()} challenges found`})
            }else{
                res.status(200).json(challenges);
            }
        })
        .catch(e=>{
            console.log(e);
        })
    })
    .catch(e=>{
        console.log(e);
    })
})
    
    module.exports = router;