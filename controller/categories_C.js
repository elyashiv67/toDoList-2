const {getAll,add,deleteC,getById} = require('../model/categories_M.js');

async function getAllCategories(req,res) {
 try {
    let user_id = req.user.id;
    let categories = await getAll(user_id);
    
    if(categories.length == 0){
      res.status(400).json({message:'no categories found'});
    }
    res.status(200).json(categories);
 } catch (err) {
    res.status(500).json({message:"err"});
 }
}

async function getCategory(req,res) {
    try {
       let user_id = req.user.id;
       console.log(user_id);
       
       let category = await getById(req.id , user_id);
       if(!category){
          res.status(400).json({message:'no category found'});
       }
        res.status(200).json(category);
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:"server error"});
    }
}

async function addCategory(req,res) {
    try {
        await add();
        res.status(200).json({message:'ok'});
        
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
}

async function deleteCategory(req,res) {
    try {
        let user_id = req.user.id;
        let category = await deleteC(req.id , user_id);
        res.status(200).json({message:'deleted'});
        
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
}

module.exports={
    getAllCategories,
    addCategory,
    deleteCategory,
    getCategory
}