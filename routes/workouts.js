const express = require('express');
const router = express.Router();
const db = require('../models');
const { Op } = require("sequelize");

router.get('/', (req, res)=>{
    const {startDate, endDate} = req.query;
    // res.send({
    //     start: startDate, 
    //     end: endDate
    // });
    db.Workout.findAll({
        where: {
            start_time: {
                [Op.gt]: startDate
            },
            end_time: {
                [Op.lt]: endDate
            },
            UserId: req.session.user.id
        }
    })
    .then(workoutsFound =>{
        if(!workoutsFound){
            res.status(404).json({error: 'No workouts found'})
        }else{
            res.status(200).json(workoutsFound);
        }
    })
    .catch(e=>{
        res.status(500).json({error: "A database error occurred"})
    })
})

module.exports = router;