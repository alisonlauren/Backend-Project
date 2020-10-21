$(function () {
    $("#datetimepicker").datetimepicker();
    $("#datetimepicker1").datetimepicker();
})

const getUserPrivateChallenges = (type, option) => {
    // return axios
    return axios
        .get(`/api/challenges?workoutType=${type}&option=${option}`)
        .then(res => {
            // return res.data
            return res.data;
        })
        .catch(e => {
            console.log(e);
        })
}

const getPublicChallenges = () => {
    // return axios
    return axios
        .get(`/api/challenges/public`)
        .then(res => {
            // return res.data
            return res.data;
        })
        .catch(e => {
            console.log(e);
        })
}

const getCompletedChallenges = () => {
    // return axios
    return axios
        .get(`/api/challenges/completed`)
        .then(res => {
            // return res.data
            return res.data;
        })
        .catch(e => {
            console.log(e);
        })
}

const addUserToChallenge = (id) => {
    return axios
        .post(`/api/challenges/${id}`)
        .then(res => {

        })
        .catch(e => {
            console.log(e);
        })
}

const returnChallengeLi = challengeData => {
    // build the html string into the `html` variable
    const html = `
        <li data-id="${challengeData.id}">
            <h4 data-id="${challengeData.id}">${challengeData.criteria.title}</h4>
            ${challengeData.criteria.description ? `<p data-id=${challengeData.id}>${challengeData.criteria.description}</p>` : ''}
        </li>
      `;
    // return the built string back to the invoking function
    return html;
}

const returnPublicChallengeLi = challengeData => {
    // build the html string into the `html` variable
    const html = `
        <li data-id="${challengeData.id}">
            <h4 data-id="${challengeData.id}">${challengeData.criteria.title}</h4>
            ${challengeData.criteria.description ? `<p data-id=${challengeData.id}>${challengeData.criteria.description}</p>` : ''}
            <button id='submit' type='submit' class="join-button" data-id=${challengeData.id}>Join</button>
        </li>
      `;
    // return the built string back to the invoking function
    return html;
}

const $publicUl = $('#public');
const $pendingUl = $('#pending');
const $completedUl = $('#completed');
// $publicUl.empty();
// $pendingUl.empty();
// $completedUl.empty();

getPublicChallenges()
    .then(allChallenges => {
        const htmlArray = allChallenges.map(individualChallenge => {
            return returnPublicChallengeLi(individualChallenge);
        })
        $publicUl.append(htmlArray.join(''));
    })
    .catch(e => {
        console.log(e);
    })

getUserPrivateChallenges('All', 'Private')
    .then(allChallenges => {
        const htmlArray = allChallenges.map(individualChallenge => {
            return returnChallengeLi(individualChallenge);
        })
        $pendingUl.append(htmlArray.join(''));
    })
    .catch(e => {
        console.log(e);
    })

getCompletedChallenges()
    .then(completedChallenges => {
        const htmlArray = completedChallenges.map(individualChallenge => {
            return returnChallengeLi(individualChallenge);
        })
        $completedUl.append(htmlArray.join(''));
    })
    .catch(e => {
        console.log(e);
    })

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('join-button')){
        const id = e.target.dataset.id;
        console.log(id);
        // pass the id to the `deleteTodo()` function
        addUserToChallenge(id)
        location.reload();
    }
});