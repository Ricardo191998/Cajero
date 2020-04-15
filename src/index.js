const express = require('express');
const keys = require('./keys/keys');
const path = require("path");
const morgan = require("morgan");
const indexRoute = require('./routes/index');
const adminRoute = require('./routes/admin');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const { database } = require('./keys/keys');

const app = express();

require('./lib/passport');

//Settings 

app.set("port",process.env.PORT|| keys.PORT);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(session({
    secret: 'banknodemariadb',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
  
// Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.count = req.user;
next();
});


//Routes

app.use('/', indexRoute);
app.use('/', require('./routes/user'))
app.use('/admin', adminRoute);
app.use(express.static(__dirname + '/public'));



//Launch server

app.listen(app.get("port"), ()=>{
    console.log("Server on port", app.get("port"));
});