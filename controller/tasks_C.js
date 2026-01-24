const {getAll,getById , add , delete_task , patchTask} = require('../model/tasks_M.js');

async function getAllTasks(req,res) {
    try {
        let user_id = req.user.id;
        // console.log(user_id);
        
        // let user_id = req.params.id;
        let Tasks = await getAll(user_id);
    
    if(Tasks.length == 0){
      res.status(400).json({message:'no Tasks found'});
    }
    res.status(200).json(Tasks);
        
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
}

async function getTask(req,res) {
    try {
        let user_id = req.user.id;
        let task = await getById(req.id , user_id);
        if(!task){
           res.status(400).json({message:'no task found'});
        }
            res.status(200).json(task);
    } catch (err) {
        res.status(500).json({message:"server error"});
    }
    
}

async function addTask(req,res) {
    try {
        let user_id = req.user.id;
        let taskName = req.name;
        let taskDesc = req.desc;
        let category_id = req.category_id || null;
        let task = await add(taskName , taskDesc , category_id , user_id);
        if(!task){
            return res.status(400).json({message:'task not added'});
        }
        res.status(200).json({message:'task added'});

    } catch (err) {
        res.status(500).json({message:"server error"});
    }
}

async function deleteT(req,res){
    try {
        let TaskID = req.params.id;
        let user_id = req.user.id;
        const Task = await delete_task(TaskID,user_id);
        if(!Task){
            res.status(400).json({message:"not deleted"})
        }
        res.status(200).json({message:"deleted"});
    } catch (err) {
        res.status(500).json({message:"server error"});
    }
    
}


async function updateTask(req,res) {
    try {
        let user_id = req.user.id;
        let taskId = req.params.id;
        let values = req.values;
        let task = await patchTask(taskId,user_id,values);
        console.log(task);
        
        if(!task){
            res.status(400).json({message:"not updated"});
        }
        res.status(200).json({message:"updated"});

    } catch (err) {
        res.status(500).json({message:"server error"});
    }
}


module.exports={getAllTasks , getTask , addTask , deleteT , updateTask};