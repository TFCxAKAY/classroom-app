const express=require("express")
const router=express.Router();
const cors=require("cors");

const{assignstudenttoteacher}=require('../controllers/assignstudenttoteacher');
const{assignteachertoclassroom}=require('../controllers/assignteachertoclassroom');
const{createclassroom}=require('../controllers/createclassroom');
const{createtimetable}=require('../controllers/createtimetable');
const{viewtimetable}=require('../controllers/viewtimetable');
const{createUser,getAllUsers,updateUserById,deleteUserById,Login,getAllClassrooms}=require('../controllers/createuser');
const{auth,isstudent,isprincipal,isteacher}=require('../middleware/auth');


router.post("/classrooms",createclassroom);
router.post("/assign-teacher",assignteachertoclassroom);
router.post("/assign-student",assignstudenttoteacher);
router.post("/timetables",createtimetable);
router.get("/timetables/:classroom_id",viewtimetable);
router.post("/createUser",createUser);
router.get("/getAllUsers",getAllUsers);
router.put("/updateUserById/:id",updateUserById);
router.delete("/deleteUserById/:id",deleteUserById);
router.post("/login",Login);
router.get('/getclassroom', getAllClassrooms);
router.get("/student",Login,auth,isstudent,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected route of student'
    });
})
router.get("/principal",Login,auth,isprincipal,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected route of princiapl'
    });
})
router.get("/teacher",Login,auth,isteacher,(req,res)=>{
    res.json({
        success:true,
        message:'welcome to the protected route of teacher'
    });
})


module.exports=router;