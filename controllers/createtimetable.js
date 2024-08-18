const Timetable = require('../modals/Timetable');
const Classroom=require('../modals/Classroom')
exports.createtimetable =async(req,res)=>{

    try {
        
        const classroom_id=req.body.classroom_id;
        const start_time=req.body.start_time;
        const end_time=req.body.end_time;
        const subject=req.body.subject;
        const day=req.body.day;
        const classroom = await Classroom.findById(classroom_id);
        if (!classroom) {
            return res.status(400).json({ error: 'Invalid classroom ID' });
        }

       
        if (start_time >= end_time) {
            return res.status(400).json({ error: 'Period start time must be before end time' });
        }
        if (!classroom.days.includes(day)) {
            return res.status(400).json({ error: 'Classroom does not operate on the specified day' });
        }

       
        const newTimetable = new Timetable({
            classroom_id,
            subject,
            start_time,
            end_time,
            day,
        });

        await newTimetable.save();
        res.status(201).json(newTimetable);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}