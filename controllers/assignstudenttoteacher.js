const StudentAssignment = require('../modals/StudentAssignment');
const User=require('../modals/User');
exports.assignstudenttoteacher =async(req,res)=>{
    try {
        
        const student_id = req.body.student_id;
        const teacher_id = req.body.teacher_id;

        
        const student = await User.findById(student_id);
        const teacher = await User.findById(teacher_id);
        if (!student || student.role !== 'Student') {
            return res.status(400).json({ error: 'Invalid student ID' });
        }
        if (!teacher || teacher.role !== 'Teacher') {
            return res.status(400).json({ error: 'Invalid teacher ID' });
        }

        

        const newAssignment = new StudentAssignment({ student_id, teacher_id });
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    
}