const express = require('express');
var router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

// Debug route to see what's in the database
router.get('/debug', async (req, res) => {
    const Courses = require('../app/model/Courses');
    try {
        const courses = await Courses.find({});
        res.json({ courses });
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/', coursesController.index); // LIST all courses
router.get('/create', coursesController.create); // form
router.post('/store', coursesController.store); // save
router.get('/:id/edit', coursesController.edit); // edit form
router.put('/:id', coursesController.update); // update (RESTful)
router.get('/:slug', coursesController.show); // detail (slug) - must be last

module.exports = router;
