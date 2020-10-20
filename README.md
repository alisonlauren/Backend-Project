# **Backend Project** <!-- omit in toc -->

Brief Explanation of our project.

- [**General**](#general)
- [**Getting Started**](#getting-started)
- [**Description and Requirements**](#description-and-requirements)
- [**Lessons Learned**](#lessons-learned)
- [**Credit** and **Licenses**](#credit-and-licenses)

## **General**

Technology:
* Front End:
  * Bootstrap
  * jQuery
  * Axios

* Back End:
  * Node
  * Express
  * Sequelize
  * es6-Template-Engine 

Project Contributors:
* Alison Manning [github](https://github.com/alisonlauren) [linkedIn](https://www.linkedin.com/in/alison-manning-9a25391b1/)
* Jacky Cheung [github](https://github.com/JC-2020) [linkedIn](https://www.linkedin.com/in/jacky-cheung-a69768195/)
* Peter Looney [github](https://github.com/plooney81) [linkedIn](https://www.linkedin.com/in/peter-looney-27b732166/)

## **Getting Started**

Project tutorial:
* Include gifs
  
Explain how the project works:
* Include some code snippets

## **Description and Requirements**

## **Lessons Learned**
The power of Sequelize
* Specifically when we had a many to many relationship for challenges to users table.
  * Once we got the migrations and models set up properly (specifically using the belongsToMany), Sequelize has a multitude of built in methods that we were able to use to quickly accomplish the tasks necessary.
```js
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
    .then(user=>{
        user.getChallenges({
        where: {
            is_completed: false,
        }
    })
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
```
* Above demonstrates one of these powerful methods that sequelize allows us to access. Once we find the right user by referecing the session user id, we can then call the getChallenges sequelize on the user result.
  * Below is a list of other methods we could also access using the same logic from above:
    * user.getChallenges()
    * user.countChallenges()
    * user.hasChallenge()
    * user.hasChallenges()
    * user.setChallenges()
    * user.addChallenge()
    * user.addChallenges()
    * user.removeChallenge()
    * user.removeChallenges()
    * user.createChallenge()

## **Credit** and **Licenses**
