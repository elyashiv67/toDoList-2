const {getAll,getById , add} = require('../model/tasks_M.js');

async function getAllTasks(req,res) {
    try {
        let user_id = req.user.id;
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
        let category_id = req.category_id;
        let task = await add(taskName , taskDesc , category_id , user_id);
        if(!task){
            return res.status(400).json({message:'task not added'});
        }
        res.status(200).json({message:'task added'});

    } catch (err) {
        res.status(500).json({message:"server error"});
    }
}


module.exports={getAllTasks , getTask , addTask};