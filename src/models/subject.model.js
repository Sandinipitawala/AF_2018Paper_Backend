const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    description:{ type: String, required: true, trim: true},
    amount:{ type: Number, reuqired: true},
    courses: [{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'courses'}]
});

//creating a variabl as Subject
const Subject = mongoose.model('subjects', SubjectSchema);
module.exports = Subject;