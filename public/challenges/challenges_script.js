$(function(){
    $("#datetimepicker").datetimepicker();
    $("#datetimepicker1").datetimepicker();
})

const getUserPrivateChallenges = type => {
    // return axios
    axios
        .get(`/api/challenges/private?workoutType=${type}`)
            .then(res=>{
                // return res.data
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
}

getUserPrivateChallenges('All');

// axios
//     .get(`/api/challenges?workoutType=Cycling`)
//         .then(res => {
//             // return res.data
//             console.log(res.data);
//         })
//         .catch(e => {
//             console.log(e);
//         })