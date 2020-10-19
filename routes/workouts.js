const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require("sequelize");

router.get('/', (req, res)=>{
    const {startDate, endDate, workoutType} = req.query;
    let whereStatement;
    if(workoutType !== 'Running' && workoutType !== 'Cycling'){
        res.status(404).json({error: 'Invalid workout type'})
    }
    if(workoutType === 'All'){
        whereStatement = {
            where: {
                start_time: {
                    [Op.gte]: startDate
                },
                end_time: {
                    [Op.lte]: endDate
                },
                UserId: req.session.user.id
            }
        }
    } else{
        whereStatement = {
            where: {
                start_time: {
                    [Op.gte]: startDate
                },
                end_time: {
                    [Op.lte]: endDate
                },
                type: {
                    [Op.iLike]: workoutType
                },
                UserId: req.session.user.id
            }
        }
    }
    db.Workout.findAll(whereStatement)
    .then(workouts =>{
        if(workouts.length === 0){
            res.status(404).json({error: 'No workouts found'})
        }else{
            res.status(200).json(workouts);
        }
    })
    .catch(e=>{
        res.status(500).json({error: "A database error occurred"})
    })
})

module.exports = router;