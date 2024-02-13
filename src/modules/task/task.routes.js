const router = require('express').Router();
const auth = require('../../middleware/auth');

const { createTask, getTasks, getTask, updateTask, deleteTask, markTaskAsCompleted,getTasksOfUser } = require('./controller/task.controller');

router.post('/create', auth(),createTask);
router.get('/allTasks', getTasks);
router.get('/all',auth(), getTasksOfUser);
router.get('/:taskId',auth(), getTask);
router.put('/:taskId',auth(), updateTask);
router.delete('/:taskId',auth(), deleteTask);
router.post('/:taskId/complete',auth(), markTaskAsCompleted);


module.exports = router;
