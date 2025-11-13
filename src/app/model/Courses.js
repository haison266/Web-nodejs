const mongoose = require('mongoose');
const { Schema } = mongoose;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        videoId: { type: String, required: true },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    }
);

// Create the slug before saving
Course.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

module.exports = mongoose.model('Course', Course);
