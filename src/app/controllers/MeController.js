const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mogoose');

class MeController {
    // [GET] /me//stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsWithDeleted({ deleted: true })])
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
