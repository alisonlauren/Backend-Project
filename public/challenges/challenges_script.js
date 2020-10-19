$(function(){
    $("#datetimepicker").datetimepicker();
    $("#datetimepicker1").datetimepicker();
})

// const getUserChallenges = type => {
//     // return axios
//     axios
//         .get(`/api/challenges?workoutType=${type}`)
//             .then(res=>{
//                 // return res.data
//                 console.log(res.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             })
// }

// getUserChallenges('Cycling')

axios
    .get(`/api/challenges?workoutType=Cycling`)
        .then(res => {
            // return res.data
            console.log(res.data);
        })
        .catch(e => {
            console.log(e);
        })