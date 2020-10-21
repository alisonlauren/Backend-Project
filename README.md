# **Welcome to GitFit 👋** <!-- omit in toc -->

* GitFit allows you to log your workout types, check your monthly personal records, create personal workout goals, and join public workout challenges all in one beautiful site.

![visitors](https://visitor-badge.glitch.me/badge?page_id=plooney81.backend-project)

<!-- ![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=javascript&logoColor=white&color=2bbc8a)
<hr> -->

- [**General**](#general)
- [**Getting Started**](#getting-started)
- [**Description and Requirements**](#description-and-requirements)
- [**Lessons Learned**](#lessons-learned)

<hr>

## **General**

![](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)

Technology and Frameworks Used:
* Front End:
  * ![Bootstrap](https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white)
  * ![jQuery](https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white)
  * Axios

* Back End:
  * ![Node](https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white)
  * ![Express](https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge)
  * Sequelize
  * es6-Template-Engine 

Project Contributors:
* Alison Manning [github](https://github.com/alisonlauren) [linkedIn](https://www.linkedin.com/in/alison-manning-9a25391b1/)
* Jacky Cheung [github](https://github.com/JC-2020) [linkedIn](https://www.linkedin.com/in/jacky-cheung-a69768195/)
* Peter Looney [github](https://github.com/plooney81) [linkedIn](https://www.linkedin.com/in/peter-looney-27b732166/)

<hr>

## **Getting Started**

Project tutorial:
* Include gifs
  
Explain how the project works:
* Include some code snippets

## **Description and Requirements**



## **Lessons Learned**
1. The power of Sequelize
* Specifically when we had a many to many relationship for our challenges to users table.
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

<!-- ## **Credit** and **Licenses** -->
