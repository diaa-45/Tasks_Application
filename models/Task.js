const Joi = require("joi");
const mongoose=require("mongoose");
const taskModel= mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
        required:true,
        trim:true,
        enum:["Game","Work"]
    },
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100
    },
    priority:{
        type:Number,
        default:1,
        trim:true,
        enum:[1,2,3,4,5,6,7,8,9,10]
    },
}, {timestamps: true});

const Task=mongoose.model("Tasks",taskModel);

// validate Adding New task

function ValidateAddTask(obj){
    const schema=Joi.object({
        category: Joi.string().trim().required(),
        title: Joi.string().trim().max(100).min(2).required(),
        priority: Joi.string().trim(), 
    });
    return schema.validate(obj);
}
// validate Update Product

function ValidateUpdateTask(obj){
    const schema=Joi.object({
        title: Joi.string().trim().max(100).min(2),
        priority: Joi.string().trim(),
    });
    return schema.validate(obj);
}


module.exports={
    Task,
    ValidateAddTask,
    ValidateUpdateTask
};