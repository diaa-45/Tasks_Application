require("./models/convig");
const express=require("express");
const UserAutho=require("./router/auth");
const TaskAutho=require("./router/task");

const app=express();
const port=process.env.PORT||7070;
require("dotenv").config()

app.use(express.json());

// api routers

app.use("/api/v1/auth",UserAutho);
app.use("/api/v1/task",TaskAutho);

app.all("*", (req,res)=>{
    res.json({succses:false , mesaage:" That is Not Valid Route , Provide Valid Please"}) ;
});

app.listen(port,()=>{
    console.log(`listinig ${process.env.NODE_ENV} on port : ${port} ....`);
});