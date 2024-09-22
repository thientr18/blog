const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 255 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, maxLength: 255, require: true },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);


// Add Plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
