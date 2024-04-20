const asynchandler=require("express-async-handler");
require("dotenv").config();
const {Task, ValidateUpdateTask,ValidateAddTask}=require("../models/Task")


const create= asynchandler(async(req,res)=>{

    const {error}=ValidateAddTask(req.body);
    if(error)
       return res.status(400).json({message: error.details[0].message});


    const task = new Task({
      user:req.user.id,
      category:req.body.category,
      title:req.body.title,
      priority:req.body.priority
    });
    await task.save();

    res.status(201).json({
      success:true,
      data:task
    });

});

const update= asynchandler(async(req,res)=>{
  
  const {error}=ValidateUpdateTask(req.body);
  if(error)
    return res.status(400).json({message: error.details[0].message});

    const task =await Task.find({user:req.user.id,_id:req.params.id});
  if(task!=0){
    const updatedTask= await Task.findByIdAndUpdate(req.params.id,{
    $set:{
      category:req.body.category,
      title:req.body.title,
      priority: req.body.priority
    }
  },{new:true});
  res.status(201).json({
    success:true,
    data:updatedTask
  });
  }else
    res.status(401).json({success: false , message: "There is an problem "});
  });

const getAll = asynchandler(async(req,res)=>{
  const tasks = await Task.find({user: req.params.id})
  .select("-__v")
  .populate("user").sort("category");
  if(tasks==0)
    res.json({success: true, message: "Tasks database is empty "})
  res.status(201).json({
    success:true,
    data:tasks
  });
});

const getOne = asynchandler(async(req,res)=>{
  
    const task =await Task.find({user:req.user.id,_id:req.params.id});
    if(task!=0){
      res.status(201).json({
        success:true,
        data:task
      });
    }else
      res.status(404).json({message : "Sorry , Task is not Found , you can add it Later"});
  
    
  });

const deleteOne= asynchandler(async(req,res)=>{
  
  const task =await Task.find({user:req.user.id,_id:req.params.id});
  if(task!=0){
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Task has been Deleted successfully", data: task});
    }else
      res.status(404).json({message : " Task is not Found"});
  
    
});

const deleteAll= asynchandler(async(req,res)=>{

    const tasks =await Task.find({user:req.user.id});
    if(tasks!=0){
        await Task.deleteMany();
        res.status(200).json({message: "Tasks has been Deleted successfully", data: tasks});
    }else
      res.status(404).json({message : " there are no tasks  "});
});

module.exports={
    create,
    getAll,
    getOne,
    deleteAll,
    deleteOne,
    update
};