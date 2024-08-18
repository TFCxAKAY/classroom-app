const Classroom = require('../modals/Classroom');
const Timetable = require('../modals/Timetable');



exports.viewtimetable =async(req,res)=>{
    try {
        const { classroom_id } = req.params;

        
        const classroom = await Classroom.findById(classroom_id);
        if (!classroom) {
            return res.status(400).json({ error: 'Invalid classroom ID' });
        }

        
        const timetables = await Timetable.find({ classroom_id });
        res.json(timetables);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}