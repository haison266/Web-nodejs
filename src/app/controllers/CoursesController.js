const Courses = require('../model/Courses');
const { mongooseToObject, multipleMongooseToObject } = require('../../ulti/mongo');

class CoursesController {
    // GET /courses
    async index(req, res, next) {
        try {
            const courses = await Courses.find({});
            console.log('Found courses:', courses); // Debug log
            res.render('courses/index', {
                courses: multipleMongooseToObject(courses),
            });
        } catch (err) {
            console.error('Error in index:', err);
            next(err);
        }
    }

    // GET /courses/:slug
    async show(req, res, next) {
        try {
            const slug = req.params.slug;
            console.log('Looking for course with slug:', slug); // Debug log
            const course = await Courses.findOne({ slug: slug });
            console.log('Found course:', course); // Debug log
            if (!course) {
                console.log('No course found with slug:', slug); // Debug log
                return res.status(404).render('404', { message: 'Course not found' });
            }
            return res.render('courses/show', { course: mongooseToObject(course) });
        } catch (err) {
            console.error('Error in show:', err);
            return next(err);
        }
    }
    // GET /courses/:id/edit
    edit(req, res, next) {
        Courses.findById(req.params.id)
            .then((course) => {
                if (!course) {
                    return res.status(404).render('404', { message: 'Course not found' });
                }
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch((err) => next(err));
    }

    // PUT /courses/:id
    async update(req, res, next) {
        try {
            console.log('Update request for ID:', req.params.id);
            console.log('Update data:', req.body);

            const { name, description, videoId } = req.body;

            // Validation
            if (!name || !description || !videoId) {
                console.log('Validation failed - missing fields');
                const course = await Courses.findById(req.params.id);
                return res.status(400).render('courses/edit', {
                    error: 'Please fill name, description and videoId',
                    course: mongooseToObject(course),
                    formData: req.body,
                });
            }

            // Clean videoId
            const cleanVideoId = videoId.split('&')[0];

            // Generate slug from name
            const slug = name
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');

            const updateData = {
                name,
                description,
                videoId: cleanVideoId,
                image: `https://img.youtube.com/vi/${cleanVideoId}/sddefault.jpg`,
                slug: slug,
            };

            console.log('Updating course with ID:', req.params.id);
            const updatedCourse = await Courses.findByIdAndUpdate(req.params.id, updateData, { new: true });

            console.log('Updated course:', updatedCourse);

            if (!updatedCourse) {
                console.log('Course not found with ID:', req.params.id);
                return res.status(404).send('Course not found');
            }

            console.log('Course updated successfully, redirecting...');
            res.redirect('/me/stored/courses');
        } catch (err) {
            console.error('Error updating course:', err);
            const course = await Courses.findById(req.params.id);
            return res.status(400).render('courses/edit', {
                error: 'Error updating course: ' + (err.message || 'Unknown error'),
                course: mongooseToObject(course),
                formData: req.body,
            });
        }
    }

    // GET /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // POST /courses/store
    async store(req, res, next) {
        try {
            console.log('Received form data:', req.body);

            const { name, description, videoId } = req.body;
            if (!name || !description || !videoId) {
                console.log('Validation failed - missing required fields');
                return res.status(400).render('courses/create', {
                    error: 'Please fill name, description and videoId',
                    formData: req.body,
                });
            }

            // Clean the videoId (remove any extra parameters)
            const cleanVideoId = videoId.split('&')[0];

            const formData = {
                name,
                description,
                videoId: cleanVideoId,
                image: `https://img.youtube.com/vi/${cleanVideoId}/sddefault.jpg`,
            };

            console.log('Creating new course with data:', formData);

            const course = new Courses(formData);
            const savedCourse = await course.save();

            console.log('Course saved successfully:', savedCourse);

            // Render a success page showing the created course
            return res.render('courses/success', {
                message: 'Course created successfully',
                course: mongooseToObject(savedCourse),
            });
        } catch (err) {
            console.error('Error saving course:', err);
            return res.status(400).render('courses/create', {
                error: 'Error saving course: ' + (err.message || 'Unknown error'),
                formData: req.body,
            });
        }
    }
}

module.exports = new CoursesController();
