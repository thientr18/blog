const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_edu_dev');
        console.log('Connected to MongoDB Successfully');
    } catch (error) {
        console.log('Connected to MongoDB Failure');
    }
}

module.exports = { connect };
