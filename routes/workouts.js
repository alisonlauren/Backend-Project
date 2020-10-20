const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op, where } = require("sequelize");
const { sequelize } = require('../models');

router.get('/', (req, res)=>{
    const {startDate, endDate, workoutType, order} = req.query;

    let whereStatement = {
        where: {
            start_time: {
                [Op.gte]: new Date(startDate + " 00:00:00")
            },
            end_time: {
                [Op.lte]: new Date(endDate + " 23:59:59")
            },
            UserId: req.session.user.id,
        },
        order:[
            [
              'start_time', 'ASC'
            ]
          ]
    }

    if(workoutType !== 'Running' && workoutType !== 'Cycling' && workoutType !== 'All' && order !== 'Miles' && order !== 'start_date'){
        res.status(404).json({error: 'Invalid workout type'})
    }
    // Ternary that checks if the workout type is all, if it isn't then the workout type is 
    // added to the where statement in the SQL Select call below.
    // (workoutType !== 'All') ? (whereStatement['type'] = {[Op.iLike]: workoutType}) : null;
    // (order !== 'start_date') ? (whereStatement['order'] = [sequelize.json("data.distance"), 'DESC']) : null;
    console.log(`\n\n${workoutType}\n\n`);
    if(workoutType !== 'All'){
        whereStatement.where.type = {[Op.iLike]: workoutType};
        whereStatement.limit = 1;
    }
    if(order !== 'start_date'){
        whereStatement.order = [
            [
                sequelize.json("data.distance"), "DESC"
            ]
        ]
    }
    console.log(whereStatement);
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