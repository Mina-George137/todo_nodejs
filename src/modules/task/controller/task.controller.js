const taskModel = require('../../../../DB/models/task');

const createTask = async (req, res) => {
    try {
        let {title, description, dueDate} = req.body;
        let userId = req.user._id;
        const newTask = new taskModel({userId, title, description, dueDate});
        await newTask.save();
        return res.status(200).json({ message: "success", data: newTask });
    } catch (error) {
        return res.status(500).json({ message: "fail", error: error.message });
    }
};

const getTasks = async (req, res) => {
    try{
        const allTasks = await taskModel.find();
        if(!allTasks) return res.status(404).json({ message: "fail", error: "No tasks found." });
        return res.status(200).json({ message: "success", data: allTasks });
    }catch(error){
        return res.status(500).json({ message: "fail", error: error.message });
    }
}

const getTask = async (req, res) => {
    try{
        const task = await taskModel.findById(req.params.taskId);
        if(!task) return res.status(404).json({ message: "fail", error: "Task not found." });
        return res.status(200).json({ message: "success", data: task });
    }catch(error){
        return res.status(500).json({ message: "fail", error: error.message });
    }
}

const updateTask = async (req, res) => {
    try{
        const updatedTask = await taskModel.findOneAndUpdate({_id:req.params.taskId,userId: req.user._id}, req.body, {new: true});
        if(!updatedTask) return res.status(404).json({ message: "fail", error: "Task not found." });
        return res.status(200).json({ message: "success", data: updatedTask });
    }
    catch(error){
        return res.status(500).json({ message: "fail", error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try{
        const deletedTask = await taskModel.findOneAndDelete({_id:req.params.taskId, userId: req.user._id});
        if(!deletedTask) return res.status(404).json({ message: "fail", error: "Task not found." });
        return res.status(200).json({ message: "success", data: deletedTask });
    }
    catch(error){
        return res.status(500).json({ message: "fail", error: error.message });
    }
};

const markTaskAsCompleted = async (req, res) => {
    try{
        const task = await taskModel.find({_id:req.params.taskId, userId: req.user._id});
        if(!task) return res.status(404).json({ message: "fail", error: "Task not found." });
        task.completed = true;
        await task.save();
        return res.status(200).json({ message: "success", data: task });
    }
    catch(error){
        return res.status(500).json({ message: "fail", error: error.message });
    }
}

const getTasksOfUser = async (req, res) => {
    try{
        const tasks = await taskModel.find({userId: req.user._id});
        if(!tasks) return res.status(404).json({ message: "fail", error: "No tasks found." });
        return res.status(200).json({ message: "success", data: tasks });
    }catch(error){
        return res.status(500).json({ message: "fail", error: error.message });
    }
};

const deleteAllTasksOfUser = async (ID) => {
    try{
        const deletedTasks = await taskModel.deleteMany({userId: ID});
        if(!deletedTasks) return res.status(404).json({ message: "fail", error: "No tasks found." });
        return res.status(200).json({ message: "success", data: deletedTasks });
    }catch(error){
        return res.status(500).json({ message: "fail", error: error.message });
    }
};

module.exports = {createTask, getTasks, getTask, updateTask, deleteTask, markTaskAsCompleted, getTasksOfUser, deleteAllTasksOfUser};