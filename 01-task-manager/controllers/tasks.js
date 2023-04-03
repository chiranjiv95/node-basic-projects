const Task=require('../models/Task');

// GET all
const getAllTasks=async(req, res)=>{

    try {
        const tasks=await Task.find({});
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({name:error.errors.name.name, msg:error.errors.name.message})
    }
    
}

// POST
const createTask=async(req, res)=>{
    try {
        const task=await Task.create(req.body)
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({name:error.errors.name.name, msg:error.errors.name.message})
    }
    
}

// GET single
const getTask=async(req, res)=>{

    const {id:taskID}=req.params;
    try {
        const task=await Task.findOne({_id:taskID});

        if(!task){
           return res.status(404).json({msg:`No task with ID : ${taskID}`})
        }
        res.status(200).json({task})

    } catch (error) {
        res.status(500).json({msg:error})   
    }
    
}

// DELETE
const deleteTask=async(req, res)=>{
    const {id:taskID}=req.params;
    try {
        const task=await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`No task with ID : ${taskID}`})
        }
        res.status(200).json({task, status:'success'})
    } catch (error) {
        res.status(500).json({msg:error})  
    }
}

// PATCH
const updateTask=async(req, res)=>{
    try {

        const {id:taskID}=req.params;
        const task=await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true,
            runValidators:true
        });

        if(!task){
            return res.status(404).json({msg:`No task with ID : ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports={getAllTasks, createTask, getTask, updateTask, deleteTask}