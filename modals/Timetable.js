const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    start_time: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/.test(v);
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    end_time: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/.test(v);
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        required: true,
    },
}, {
    timestamps: true,
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
