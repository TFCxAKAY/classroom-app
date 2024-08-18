const express=require('express');
const app=express();
require('./config/database');
require("dotenv").config();
const cors=require("cors");

const user=require("./routes/classroom");

const PORT =process.env.PORT

app.use(express.json());
app.use(cors());

app.listen(PORT,()=>{
    console.log(`server started ${PORT}`);
});


app.get('/',(req,res)=>{
    res.send("Home page")
 
 });

app.use("/api",user);
