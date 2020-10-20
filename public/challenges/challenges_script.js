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

const returnWorkoutList = challengeData => {
    // build the html string into the `html` variable
    const html = `
        <li data-id="${challengeData.id}">
            <p data-id="${challengeData.id}" type="submit">Distance: ${challengeData.data.distance}</p>
            <p data-id="${challengeData.id}" type="submit">Calories Burned: ${challengeData.cal}</p>
        </li>
      `;
    // return the built string back to the invoking function
    return html;
}

const $cyclingPrs = $('#cyclingPrs');
const $runningPrs = $('#runningPrs');
$cyclingPrs.empty();
$runningPrs.empty();

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