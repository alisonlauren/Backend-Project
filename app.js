const express = require('express');
const bodyParser = require('body-parser');
const db =  require('./models');
const es6Renderer =  require('express-es6-template-engine');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({ db: db.sequelize });

const app = express();

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


function checkAuth(req, res, next) {
if (req.session.user) {
    next();
} else {
    res.redirect('/login');
}
}

app.get('/', checkAuth, (req, res) => {
res.render('login', {
    locals: {
    user: req.session.user
    }
});
})

//creating register page
app.get('/register', (req, res) => {
res.render('register', {
locals: {
    error: null,
    title: "Register",

},
    partials: {head:"partials/head", footer: "partials/footer"},

});
})

app.post('/register', (req, res) => {
//check if post was submitted with email and password
if (!req.body.email || !req.body.password) {
    res.render('register', {
    locals: {
        error: "Please submit all required fields"
    }
    })
    return;
}
const { email, password } = req.body;
bcrypt.hash(password, 10, (err, hash) => {
    db.User.create({
    email: email,
    password: hash,
    })
    .then((user) => {
    res.redirect('/login');
    })
})

})



app.listen(3000, function () {
    console.log('Activity Tracker API....');
});


