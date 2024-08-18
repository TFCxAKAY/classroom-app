const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: {
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
    days: {
        type: [String],
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: props => `At least one day must be selected.`
        }
    },
   
}, {
    timestamps: true,  
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
