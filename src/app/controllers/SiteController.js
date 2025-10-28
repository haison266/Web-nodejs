const Course = require('../model/Courses');
const mongoose = require('mongoose');
class SiteController {
    //Get homepage
    async home(req, res) {
        try {
            const courses = await Course.find({}); // lấy dữ liệu
            return res.json(courses);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
    }
    // Get /search
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController();
