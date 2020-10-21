$(function(){
    $("#datetimepicker").datetimepicker();
    $("#datetimepicker1").datetimepicker();
})

var cal = {
// (A) PROPERTIES
mName : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Month Names
data : null, // Events for the selected period
sDay : 0, // Current selected day
sMth : 0, // Current selected month
sYear : 0, // Current selected year
sMon : false, // Week start on Monday?

// (B) DRAW CALENDAR FOR SELECTED MONTH
list : async function () {
    // (B1) BASIC CALCULATIONS - DAYS IN MONTH, START + END DAY
    // Note - Jan is 0 & Dec is 11 in JS.
    // Note - Sun is 0 & Sat is 6
    cal.sMth = parseInt(document.getElementById("cal-mth").value); // selected month
    cal.sYear = parseInt(document.getElementById("cal-yr").value); // selected year
    var daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(), // number of days in selected month
        startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), // first day of the month
        endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(); // last day of the month

    // // (B2) LOAD DATA FROM API.... 
    // cal.data = localStorage.getItem("cal-" + cal.sMth + "-" + cal.sYear);
    // if (cal.data==null) {
    // localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, "{}");
    // cal.data = {};
    // } else {
    // cal.data = JSON.parse(cal.data);
    // }
const getWorkoutsByType = type =>{
        let today = new Date();
        
        let getYear = parseInt(document.getElementById("cal-yr").value);
        let month = parseInt(document.getElementById("cal-mth").value);
        if(!getYear || !month){
            getYear = today.getFullYear();
            month = today.getMonth();
        }
        const order = 'Miles';
        // Render user workouts
        return axios
        .get(`/api/workouts?startDate=${getYear}-${month + 1}&endDate=${getYear}-${month + 2}&workoutType=${type}&order=${order}`)
                .then(res=>{
                    return res.data
                })
                .catch(e=>{
                    console.log(e);
                })
}

function returnWorkoutList(workoutData) {
    // build the html string into the `html` variable
    const html = `
        <li data-id="${workoutData.id}">
            <p data-id="${workoutData.id}" type="submit">Distance: ${workoutData.data.distance}</p>
            <p data-id="${workoutData.id}" type="submit">Calories Burned: ${workoutData.cal}</p>
        </li>
      `;
    // return the built string back to the invoking function
    return html;
}
const $cyclingPrs = $('#cyclingPrs');
const $runningPrs = $('#runningPrs');
$cyclingPrs.empty();
$runningPrs.empty();

getWorkoutsByType('Cycling')
    .then(workoutData=>{
        const htmlArray = workoutData.map(individualWorkout=>{
            return returnWorkoutList(individualWorkout);
        })
        $cyclingPrs.append(htmlArray.join(''));
    })
    .catch(e=>{
        $cyclingPrs.append('<li>There\'s a 404 in your workout history...Git to cycling</li>');
    })




getWorkoutsByType('Running')
    .then(workoutData=>{
        const htmlArray = workoutData.map(individualWorkout=>{
            return returnWorkoutList(individualWorkout);
        })
        $runningPrs.append(htmlArray.join(''));
    })
    .catch(e=>{
        $runningPrs.append('<li>There\'s a 404 in your workout history...Git to stepping</li>');
    })

async function loadData(type) {
    const getYear = parseInt(document.getElementById("cal-yr").value);
    const month = parseInt(document.getElementById("cal-mth").value);
    // console.log(`${getYear}-${month + 1}`);
    const returnObject = {};
    const order = 'start_date';
    // Render user workouts
    return await axios
        .get(`/api/workouts?startDate=${getYear}-${month + 1}&endDate=${getYear}-${month + 2}&workoutType=${type}&order=${order}`)
            .then( (res) =>{
                if (res.data){
                    res.data.forEach(individualWorkout => {
                        let workOutStartDate = individualWorkout.start_time.toString().slice(8,10);
                        if(workOutStartDate.slice(0,1) == 0){
                            workOutStartDate = workOutStartDate.slice(1,2);
                        }
                        if (returnObject[workOutStartDate]) {
                            returnObject[workOutStartDate] +=  `\n${individualWorkout.type}`                        
                        } else {
                            returnObject[workOutStartDate] = individualWorkout.type                      }
                    });
                    return returnObject;  
                } else{
                    return {};
                }
            })
            .catch( e => {
                console.log(e);
            })
}

async function responseData() {
    await loadData('All') 
    .then( async (response) => {
        cal.data = {};
        cal.data = response;
        console.log(cal.data);
    }) 
    ;

}
await responseData();
    

    // (B3) DRAWING CALCULATIONS
    // Determine the number of blank squares before start of month
    var squares = [];
    if (cal.sMon && startDay != 1) {
    var blanks = startDay==0 ? 7 : startDay ;
    for (var i=1; i<blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && startDay != 0) {
    for (var i=0; i<startDay; i++) { squares.push("b"); }
    }

    // Populate the days of the month
    for (var i=1; i<=daysInMth; i++) { squares.push(i); }

    // Determine the number of blank squares after end of month
    if (cal.sMon && endDay != 0) {
    var blanks = endDay==6 ? 1 : 7-endDay;
    for (var i=0; i<blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && endDay != 6) {
    var blanks = endDay==0 ? 6 : 6-endDay;
    for (var i=0; i<blanks; i++) { squares.push("b"); }
    }

    // (B4) DRAW HTML CALENDAR
    // Container & Table
    var container = document.getElementById("cal-container"),
        cTable = document.createElement("table");
    cTable.id = "calendar";
    container.innerHTML = "";
    container.appendChild(cTable);

    // First row - Days
    var cRow = document.createElement("tr"),
        cCell = null,
        days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    if (cal.sMon) { days.push(days.shift()); }
    for (var d of days) {
    cCell = document.createElement("td");
    cCell.innerHTML = d;
    cRow.appendChild(cCell);
    }
    cRow.classList.add("head");
    cTable.appendChild(cRow);

    // Days in Month
    var total = squares.length;
    cRow = document.createElement("tr");
    cRow.classList.add("day");
    for (var i=0; i<total; i++) {
    cCell = document.createElement("td");
    if (squares[i]=="b") { cCell.classList.add("blank"); }
    else {
        cCell.innerHTML = "<div class='dd'>"+squares[i]+"</div>";
        if (cal.data[squares[i]]) {
        cCell.innerHTML += "<div class='evt'>" + cal.data[squares[i]] + "</div>";
        }
        cCell.addEventListener("click", function(){
        cal.show(this);
        });
    }
    cRow.appendChild(cCell);
    if (i!=0 && (i+1)%7==0) {
        cTable.appendChild(cRow);
        cRow = document.createElement("tr");
        cRow.classList.add("day");
    }
    }

    // (B5) REMOVE ANY PREVIOUS ADD/EDIT EVENT DOCKET
    cal.close();
},

// (C) SHOW EDIT EVENT DOCKET FOR SELECTED DAY
show : function (el) {
    // (C1) FETCH EXISTING DATA
    cal.sDay = el.getElementsByClassName("dd")[0].innerHTML;

    // (C2) DRAW EVENT FORM
    var tForm = "<h1>" + (cal.data[cal.sDay] ? "EDIT" : "ADD") + " EVENT</h1>";
    tForm += "<div id='evt-date'>" + cal.sDay + " " + cal.mName[cal.sMth] + " " + cal.sYear + "</div>";
    tForm += `<div class="container">
    <div class="row">
    <div class='col-sm-6 center-block'>
        <div class="form-group">
            <select class="form-control" name="workoutType" id="workoutType">
                <option selected disabled>Select a Type of Workout</option>
                <option>Cycling</option>
                <option>Running</option>
                <!-- <option>Lifting</option> -->
            </select>
        </div>
        <!-- START TIME WO -->
        <div class="container">
            <div class="row">
            <div class='col-sm-6'>
                <div class="form-group">
                    <div class='input-group date' id='datetimepicker'>
                        <input type='text' name="startTime" class="form-control" />
                        <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <!-- END TIME WO -->
        <div class="container">
        <div class="row">
            <div class='col-sm-6'>
                <div class="form-group">
                    <div class='input-group date' id='datetimepicker1'>
                    <input type='text' name="endTime" class="form-control" />
                    <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                    </div>
                </div>
            </div>
        </div>
        </div>
<!-- CALORIE INPUT -->
<div>
    <label for="calorie">Calories Burned</label>
    <input type="integer" name="calorie" placeholder="305" id="calorie" required>
</div>
<!-- MILES COMPLETED -->
<div>
    <label for="miles">Miles Completed</label>
    <input type="integer" name="miles" placeholder="5.5"id="miles" required>
</div>
<div class="buttongroup">
<input type='button' value='Close' onclick='cal.close()'/>
<input type='button' value='Delete' onclick='cal.del()'/>
<button id='submit' type='submit' value='Save'>Log Workout</button>
</div>
</div>`

    
    // (C3) ATTACH EVENT FORM
    var eForm = document.createElement("form");
    eForm.setAttribute("action", "");
    eForm.setAttribute("method", "POST");
    eForm.innerHTML = tForm;
    // eForm.addEventListener("submit", cal.save);
    var container = document.getElementById("cal-event");
    container.innerHTML = " ";
    container.appendChild(eForm);

},




// (D) CLOSE EVENT DOCKET
close : function () {
    document.getElementById("cal-event").innerHTML = "";
},

// (E) SAVE EVENT
save : function (evt) {
    cal.data[cal.sDay] = document.getElementById("workoutType").value;
    localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, JSON.stringify(cal.data));
    cal.list();
    return true;
},

// (F) DELETE EVENT FOR SELECTED DATE
del : function () {
    if (confirm("Remove event?")) {
    delete cal.data[cal.sDay];
    localStorage.setItem("cal-" + cal.sMth + "-" + cal.sYear, JSON.stringify(cal.data));
    cal.list();
    }
}
};

// (G) INIT - DRAW MONTH & YEAR SELECTOR
window.addEventListener("load", function () {
// (G1) DATE NOW
var now = new Date(),
    nowMth = now.getMonth(),
    nowYear = parseInt(now.getFullYear());

// (G2) APPEND MONTHS
var mth = document.getElementById("cal-mth");
for (var i = 0; i < 12; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cal.mName[i];
    if (i==nowMth) { opt.selected = true; }
    mth.appendChild(opt);
}

// (G3) APPEND YEARS
// Set to 10 years range. Change this as you like.
var year = document.getElementById("cal-yr");
for (var i = nowYear-10; i<=nowYear+10; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    if (i==nowYear) { opt.selected = true; }
    year.appendChild(opt);
}

// (G4) START - DRAW CALENDAR
document.getElementById("cal-set").addEventListener("click", cal.list);
cal.list();
});

