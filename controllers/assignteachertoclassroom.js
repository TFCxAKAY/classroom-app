const TeacherAssignment = require('../modals/Teacher');
const Classroom = require('../modals/Classroom');
const User=require('../modals/User')


exports.assignteachertoclassroom =async(req,res)=>{
    try {
        const { teacher_id, classroom_id } = req.body;
      

        
        const teacher = await User.findById(teacher_id);
       
        const classroom = await Classroom.findById(classroom_id);
        

        if (!teacher || teacher.role !== 'Teacher') {
            return res.status(400).json({ error: 'Invalid teacher ID or teacher not found' });
        }
        if (!classroom) {
            return res.status(400).json({ error: 'Invalid classroom ID or classroom not found' });
        }

       
        const existingAssignment = await TeacherAssignment.findOne({ teacher_id });
        if (existingAssignment) {
            return res.status(400).json({ error: 'Teacher is already assigned to a classroom' });
        }

       
        const newAssignment = new TeacherAssignment({ teacher_id, classroom_id });
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}