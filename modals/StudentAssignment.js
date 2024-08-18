const mongoose = require('mongoose');

const studentAssignmentSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(v) {
                const student = await mongoose.model('User').findOne({ _id: v, role: 'Student' });
                return student !== null;
            },
            message: props => `Invalid student ID or user is not a student.`
        }
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(v) {
                const teacher = await mongoose.model('User').findOne({ _id: v, role: 'Teacher' });
                return teacher !== null;
            },
            message: props => `Invalid teacher ID or user is not a teacher.`
        }
    },
}, {
    timestamps: true,
});

const StudentAssignment = mongoose.model('StudentAssignment', studentAssignmentSchema);

module.exports = StudentAssignment;
