const { getAll, add, deleteC, getById, PatchCategory , countTasksForCategory} = require('../model/categories_M.js');

async function getAllCategories(req, res) {
    try {
        let user_id = req.user.id;
        let categories = await getAll(user_id);

        if (categories.length == 0) {
            res.status(400).json({ message: 'no categories found' });
            return;
        }
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: "err" });
    }
}



async function getCategory(req, res) {
    try {
        let user_id = req.user.id;
        console.log(user_id);

        let category = await getById(req.id, user_id);
        if (!category) {
            res.status(400).json({ message: 'no category found' });
            return;
        }
        res.status(200).json(category);

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "server error" });
    }
}

async function addCategory(req, res) {
    try {
        let user_id = req.user.id;
        let categoryName = req.name;
        let category = await add(categoryName, user_id);
        if (!category) {
            return res.status(400).json({ message: 'category not added' });
        }
        res.status(200).json({ message: 'ok' });

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "server error" });
    }
}

async function deleteCategory(req, res) {
    try {
        let category = await deleteC(req.id);
        res.status(200).json({ message: 'deleted' });

    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
}

async function editCategory(req, res) {
    try {
        let categoryId = req.params.id;
        let categoryName = req.name;
        let user_id = req.user.id;
        let category = await PatchCategory(categoryId, user_id, categoryName);
        if (!category) {
            return res.status(400).json({ message: 'no category found' });
        }
        res.status(200).json({ message: 'updated' });

    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
}

async function getCategoryTaskCount(req, res) {
    try {
        let categoryId = req.id;
        let taskCount = await countTasksForCategory(categoryId);
        console.log(taskCount);
        if (taskCount === null || taskCount === undefined || taskCount <= 0) {
            return res.status(400).json({ message: 'no category found' });
        }
        
        res.status(200).json({ taskCount: taskCount });
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory,
    getCategory,
    editCategory,
    getCategoryTaskCount
}