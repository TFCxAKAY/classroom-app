const Classroom = require('../modals/Classroom');
const User = require('../modals/User');


exports.createclassroom =async(req,res)=>{
    try {
      
        const name=req.body.name;
        const start_time=req.body.start_time;
        const end_time=req.body.end_time;
        const days=req.body.days;
       

       
       

       
        if (start_time >= end_time) {
            return res.status(400).json({ error: 'Classroom start time must be before end time' });
        }

        const newClassroom = new Classroom({
            name,
            start_time,
            end_time,
            days,
            
        });

        await newClassroom.save();
        res.status(201).json(newClassroom);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}