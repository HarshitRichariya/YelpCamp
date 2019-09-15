const mongoose = require('mongoose');
const Campground = require('./models/campground');
let Comment = require("./models/comment");

let data = [
    {
        name: "Cloud's Rest", 
        image: "https://hobbyhelp.com/wp-content/uploads/2019/03/camping-for-beginners.jpg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque tempore, eum officia, accusantium ex, quidem architecto enim nulla dolorem sequi culpa dignissimos obcaecati at facilis alias dolor laudantium. Exercitationem explicabo ratione illum perferendis laudantium animi quisquam odit ullam, id nisi, unde quos quas architecto expedita enim corporis est molestias repellat."
    },
    {
        name: "Cloud's Rest", 
        image: "https://hobbyhelp.com/wp-content/uploads/2019/03/camping-for-beginners.jpg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque tempore, eum officia, accusantium ex, quidem architecto enim nulla dolorem sequi culpa dignissimos obcaecati at facilis alias dolor laudantium. Exercitationem explicabo ratione illum perferendis laudantium animi quisquam odit ullam, id nisi, unde quos quas architecto expedita enim corporis est molestias repellat."
    },
    {
        name: "Cloud's Rest", 
        image: "https://hobbyhelp.com/wp-content/uploads/2019/03/camping-for-beginners.jpg",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque tempore, eum officia, accusantium ex, quidem architecto enim nulla dolorem sequi culpa dignissimos obcaecati at facilis alias dolor laudantium. Exercitationem explicabo ratione illum perferendis laudantium animi quisquam odit ullam, id nisi, unde quos quas architecto expedita enim corporis est molestias repellat."
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, (err) => {
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(seed => {
            Campground.create(seed, (err, campground) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great",
                            author: "Homer"
                        }, (err, comment) => {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                }
            });
        });
    });
};

module.exports = seedDB;