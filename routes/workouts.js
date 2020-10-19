const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require("sequelize");

router.get('/', (req, res)=>{
    const {startDate, endDate, workoutType} = req.query;
    let whereStatement;
    if(workoutType !== 'Running' && workoutType !== 'Cycling' && workoutType !== 'All'){
        res.status(404).json({error: 'Invalid workout type'})
    }
    if(workoutType === 'All'){
        whereStatement = {
            where: {
                start_time: {
                    [Op.gte]: startDate + " 00:00:00-00"
                },
                end_time: {
                    [Op.lte]: endDate + " 23:59:59-00"
                },
                UserId: req.session.user.id
            }
        }
    } else {
        whereStatement = {
            where: {
                start_time: {
                    [Op.gte]: startDate + " 00:00:00-00"
                },
                end_time: {
                    [Op.lte]: endDate + " 23:59:59-00"
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
            res.json()
        }else{
            res.json(workouts);
        }
    })
    .catch(e=>{
        res.status(500).json({error: "A database error occurred"})
    })
})

module.exports = router;