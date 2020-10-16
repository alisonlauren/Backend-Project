const express = require('express');
const bodyParser = require('body-parser');
const db =  require('./models');
const es6Renderer =  require('express-es6-template-engine');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize });
const bcrypt = require('bcrypt');
const app = express();

// Route Require Section
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const workoutsListRouter = require('./routes/workouts');
const challengesRouter = require('./routes/challenges');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret', // used to sign the cookie
  resave: false, // update session even w/ no changes
  saveUninitialized: true, // always create a session
  store: store,
}))

store.sync();

app.use(express.static('./public'));

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


// function checkAuth(req, res, next) {
// if (req.session.user) {
//     next();
// } else {
//     res.redirect('/login');
// }
// }

// creating route for home
app.get('/', (req, res) => {
    res.render('home', {
        locals: {
            error: null,
            title: "GitFit"
        },
        partials:{
            head:"partials/head",
            footer:"partials/footer"
        }
    });
})

// routes for login
app.use('/login', loginRouter);

// creating register page
app.use('/register', registerRouter);

// dashboard routes
app.use('/dashboard', dashboardRouter);

// get all workouts for a user api call
app.use('/api/workouts', workoutsListRouter);

// challenges routes
app.use('/challenges', challengesRouter);

app.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/login');
})

app.listen(3000, function () {
    console.log('Activity Tracker API....');
});
