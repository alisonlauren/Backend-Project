const express = require('express');
const router = express.Router();
const db = require('../models');
const {Op} = require('sequelize');

router.get('/completed', (req, res)=>{
    db.Challenge.findAll({
        where: {
            is_completed: true,
        },
    })
    .then(challenges=>{
        res.status(200).json(challenges);
    })
    .catch(e=>{
        console.log(e);
    })
})

router.get('/public', (req, res)=>{
    db.Challenge.findAll({
        where: {
            is_completed: false,
            is_public: true
        },
        // include: {
        //     model: db.User,
        //     where: {
        //         id : {[Op.ne]: req.session.user.id}
        //     }
        // }
        // include: [{
        //     model: db.User,
        //     through:{
        //         where: {
        //             UserId : {[Op.ne]: req.session.user.id}
        //         }
        //     }
        // }]
    })
    .then(challenges=>{
        res.status(200).json(challenges);
    })
    .catch(e=>{
        console.log(e);
    })
})

// api route that returns a list of challenges that the user has listed into
router.get('/', (req, res)=>{
    // req.query.sortBy ? const {sortBy} = req.query: null;
    // const {sortBy} = req.query;
    const {workoutType, option} = req.query;

    let whereStatement = {
        where: {
            is_completed: false,
        }
    }

    if(workoutType !== 'Running' && workoutType !== 'Cycling' && workoutType !== 'All' && option !== 'Private' && option  !== 'Public'){
        res.status(404).json({error: 'Invalid workout/option type'})
    }
    // Ternary that checks if the workout type is all, if it isn't then the workout type is 
    // added to the where statement in the SQL Select call below.
    if(workoutType !== 'All'){ 
        whereStatement.where.type = {
            [Op.iLike]: workoutType
        }
        secondWhere.where.id = req.session.user.id;
    }
    if(option !== 'Private'){
        whereStatement.where.is_public = true;
        secondWhere.where.id = req.session.user.id;
    }

    db.User.findOne({
        where: {id : req.session.user.id}
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

// Need form to test
router.post('/:id', (req, res)=>{
    const { id } = req.params
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
        .then(user => {
            db.Challenge.findOne({
                where: {
                    id: id
                }
            })
            .then(foundChallenge=>{
                user.addChallenge(foundChallenge)
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