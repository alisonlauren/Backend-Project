const express = require('express');
const router = express.Router();
const db = require('../models');

// api route that returns a list of challenges that the user has listed into
router.get('/', (req, res)=>{
    // req.query.sortBy ? const {sortBy} = req.query: null;
    // const {sortBy} = req.query;
    const {workoutType} = req.query;
    if(workoutType !== 'Running' && workoutType !== 'Cycling'){
        res.status(404).json({error: 'Invalid workout type'})
    }
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
    .then(user=>{
        user.getChallenges({
            where: {
                is_completed: false,
                type: workoutType
            }
        })
        .then(challenges => {
            if(challenges.length === 0){
                res.status(404).json({error: 'No challenges found'})
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