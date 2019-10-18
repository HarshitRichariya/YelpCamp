const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const flash             = require('connect-flash');
const passport          = require('passport');
const LocalStrategy     = require('passport-local');
const methodOverride    = require('method-override');

const Campground        = require('./models/campground');
const Comment           = require('./models/comment');
const User              = require('./models/user');
const seedDB            = require('./seeds');

// REQUIRING ROUTES
const commentRoutes     = require('./routes/comments');
const campgroundRoutes  = require('./routes/campgrounds');
const indexRoutes       = require('./routes/index');

// mongodb+srv://harshit:<password>@yelpcamp-cn6dg.mongodb.net/test?retryWrites=true&w=majority
// mongodb://localhost/yelp_camp

mongoose
.connect("mongodb+srv://harshit:harsh16it@yelpcamp-cn6dg.mongodb.net/test?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Connected to Database");
})
.catch(err => {
    console.log("Not able to connect to the database", err)
})

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

let port = process.env.PORT || 8000;
app.listen(port, process.env.IP, () => {
    console.log('Server is running on port ' + port);
});