const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
        trim: true,
    },
    email: {
        type: String,
        required: true,  
        trim: true,
        unique: true,   
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], 
    },
    password:{
        type:String,
        required:true,
        

    },
    role: {
        type: String,
        enum: ["Principal", "Student", "Teacher"],
        required: true, 
    },
}, {
    timestamps: true,  
});


const User = mongoose.model('User', userSchema);

module.exports = User;



