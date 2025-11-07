const Courses = require('../model/Courses');
const { mongooseToObject } = require('../../ulti/mongo');

class CoursesController {
    // Get /courses/:slug
    show(req, res, next) {
        Courses.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }
}
module.exports = new CoursesController();
