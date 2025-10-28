// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');
async function connect(
    // `uri` parameter: MongoDB connection string; default uses MONGO_URI env var or local DB
    uri = 'mongodb://localhost:27017/Course_db_dev',
    options = { useNewUrlParser: true, useUnifiedTopology: true }
) {
    try {
        await mongoose.connect(uri, options); // opens connection, returns a promise
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

module.exports = { connect };
