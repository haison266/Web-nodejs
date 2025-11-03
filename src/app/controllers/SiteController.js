const Course = require('../model/Courses');
const mongoose = require('mongoose');
const { multipleMongooseToObject } = require('../../ulti/mongo');

class SiteController {
    // Get homepage/courses
    home(req, res, next) {
        // renamed from index -> home
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    // render 'home' view
                    courses: multipleMongooseToObject(courses), // convert Mongoose documents to plain objects
                });
            }) // pass data to view
            .catch(next); // pass the function, don't call it
    }

    // Get /search
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
