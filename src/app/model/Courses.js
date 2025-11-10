const mongoose = require('mongoose');
const { Schema } = mongoose;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        videoId: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Course', Course);
