const Campground = require('../models/campground');
const Comment = require('../models/comment');

// all the middleware
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                req.flash('error', 'Campground not found');
                res.redirect('/campgrounds');
            } else {
                // does user own the campground
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to login to do that');
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                res.redirect('/campgrounds');
            } else {
                // does user own the comment
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be login to do that');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Please Login first');
    res.redirect('/login');
}

module.exports = middlewareObj