const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mogoose');

class MeController {
    // [GET] /me//stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({})

        Promise.all([
            Course.find({}).sortedcourse(req), // => get the SORTED cout for the courses
            Course.countDocumentsWithDeleted({ deleted: true })
        ])
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    trashCourses(req, res, next) {
        Course.findWithDeleted({deleted: true})
            .then((binCourses) => 
                res.render('me/trash-courses', {
                    binCourses: multipleMongooseToObject(binCourses),
                }),
            )
            .catch(next);
    }
}   

module.exports = new MeController();
