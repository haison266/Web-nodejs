const mongoose = require('mongoose');
const { Schema } = mongoose;

const Course = new Schema({
    name: String,
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);
