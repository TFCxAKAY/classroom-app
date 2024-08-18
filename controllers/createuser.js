const User = require('../modals/User');
const Classroom=require('../modals/Classroom')

const TeacherAssignment = require('../modals/Teacher');
const StudentAssignment = require('../modals/StudentAssignment');
require("dotenv").config();
const jwt=require("jsonwebtoken");


exports.createUser = async (req, res) => {
    try {
     
        const email=req.body.email;
        const name=req.body.name;
        const password=req.body.password;
        const role=req.body.role;
    

        
        const existinguser=await User.findOne({email});
        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"user already exist",
            });

        }
      

        const user=await User.create({
            name,email,password,role
        })
        res.status(200).json(
            {
                success:true,
               
                message:'entry created successfully'
                
            }
            

        );


    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500).json({
            success:false,
            message:'user not created '
        })

    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.query; 
        let query = {};

        if (role) {
            query.role = role;
        }

        const users = await User.find(query); 
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};



exports.getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find(); 
        res.status(200).json(classrooms);  
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};







exports.updateUserById = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

       
        if (role && role !== user.role) {
            return res.status(400).json({ error: 'Role cannot be changed' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

      
      
         if (user.role === 'Teacher') {
          
            const assignment = await TeacherAssignment.findOne({ teacher_id: user._id });
            if (assignment) {
                return res.status(400).json({ error: 'Cannot delete Teacher assigned to a classroom' });
            }
        } else if (user.role === 'Student') {
           
            const assignment = await StudentAssignment.findOne({ student_id: user._id });
            if (assignment) {
                return res.status(400).json({ error: 'Cannot delete Student assigned to a teacher' });
            }
        }

        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.Login=async(req,res,next)=>{
    try{

        const email=req.body.email;
        const password=req.body.password;

        if(!email || !password){
            res.status(400).json({
                success:false,
                message:'plz fill the details'

            });
        }

        let user=await User.findOne({email});
        if(!User){
            res.status(401).json({
                success:false,
                message:'not registered user'

            });
        }
        const payload={
            email:user.email,
            id:user._id,
            role:user.role,

        }
        if(password===user.password){
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",

            })
            user=user.toObject();
            user.token=token;
            user.password=undefined;
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("cook",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'user logged in successfully',

            })

        }

      
        else{
            res.status(403).json({
                success:false,
                message:'wrong password'

            });
        }

    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500).json({
            success:false,
            message:'user not logged in  '
        })

    }
   
}
