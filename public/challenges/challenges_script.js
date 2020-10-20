$(function(){
    $("#datetimepicker").datetimepicker();
    $("#datetimepicker1").datetimepicker();
})

const getUserPrivateChallenges = (type, option) => {
    // return axios
    axios
        .get(`/api/challenges?workoutType=${type}&option=${option}`)
            .then(res=>{
                // return res.data
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
}

const getPublicChallenges = () => {
    // return axios
    axios
        .get(`/api/challenges/public`)
            .then(res=>{
                // return res.data
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
}

const getCompletedChallenges = () => {
    // return axios
    axios
        .get(`/api/challenges/completed`)
            .then(res=>{
                // return res.data
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            })
}

getUserPrivateChallenges('All', 'Private');

getPublicChallenges();

getCompletedChallenges();

// axios
//     .get(`/api/challenges?workoutType=Cycling`)
//         .then(res => {
//             // return res.data
//             console.log(res.data);
//         })
//         .catch(e => {
//             console.log(e);
//         })