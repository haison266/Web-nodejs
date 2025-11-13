const coursess = require('../model/Courses');
const { mongooseToObject, multipleMongooseToObject } = require('../../ulti/mongo');
class MeController {
    //GET /me/stored/courses\
    storedCourses(req, res, next) {
        coursess
            .find({})
            .then((courses) => {
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    storedNews(req, res, next) {
        res.render('search');
    }
}

module.exports = new MeController();
