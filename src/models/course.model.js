const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    code:{ type: String, required: true, trim: true},
    passMark:{ type: Number, reuqired: true},
    lectureInCharge: { type: String, required: true, trim: true},
    subjects: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'subjects'}]
});

//creating a variabl as Course
const Course = mongoose.model('courses', CourseSchema);
module.exports = Course;