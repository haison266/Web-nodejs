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

    //Get /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // Post /courses/store
    store(req, res, next) {
        try {
            console.log('store req.body:', req.body); // debug: what server receives
            const { name, description, videoId } = req.body;
            // basic server-side validation
            if (!name || !description || !videoId) {
                // trả lại view với lỗi hoặc status 400
                return res.status(400).render('courses/create', {
                    error: 'Please fill name, description and videoId',
                    formData: req.body,
                });
            }
            const formData = { ...req.body };
            formData.image = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
            const course = new Courses(formData);
            course
                .save()
                .then(() => res.redirect('/courses')) // or wherever
                .catch(next);
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new CoursesController();
