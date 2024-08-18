const mongoose = require('mongoose');

const teacherAssignmentSchema = new mongoose.Schema({
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
    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true,
    },
}, {
    timestamps: true, 
});

const TeacherAssignment = mongoose.model('TeacherAssignment', teacherAssignmentSchema);

module.exports = TeacherAssignment;
