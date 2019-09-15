const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

// INDEX - show all campgrounds
router.get('/', (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: data});
        }
    });
});

// CREATE - add new campground to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {name: name, price: price, image: image, description: desc, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
});

// NEW - show form to create new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec((err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: data});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', {campground: foundCampground});
    });
});


// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    // find and update the correct campground
    Campground.findOneAndUpdate(req.params.id, req.body.campground, (err, data) => {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            // redirect somewhere(show page)
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findOneAndDelete(req.params.id, (err) => {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;