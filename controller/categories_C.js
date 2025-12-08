const {getAll,add} = require('../model/categories_M.js');

async function getAllCategories(req,res) {
 try {
    let categories = await getAll();
    
    if(categories.length == 0){
      res.status(400).json({message:'no data'});
    }
    res.status(200).json(categories);
 } catch (err) {
    res.status(500).json({message:"err"});
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

module.exports={
    getAllCategories,
    addCategory
}