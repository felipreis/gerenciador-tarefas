import express from 'express'
import UserController from '../controller/UserController.js'
import AuthController from  '../controller/AuthController.js'
import '../middleware/authToken.js'
import authToken from '../middleware/authToken.js';
import ProjectController from '../controller/ProjectController.js';
import TaskController from '../controller/TaskController.js'

const router = express.Router();

router.get('/health',(req,res) => {
    res.status(200).json({message: "API online"})
})

//user e login
router.get('/users',authToken, UserController.getAll)
router.get('/users/:id',authToken, UserController.getById)
router.get('/auth/me',authToken, AuthController.me)
router.post('/users/email',authToken, UserController.getByEmail)
router.post('/users', UserController.create)
router.post('/auth/login', AuthController.login)

//projetos
router.post('/projects',authToken,ProjectController.create)
router.get('/projects',authToken,ProjectController.getAllProjects)
router.get('/projects/:id',authToken,ProjectController.getProjectById)
router.put('/projects/:id',authToken,ProjectController.updateProject)
router.delete('/projects/:id',authToken,ProjectController.deleteProjects)

//tasks

router.post('/task',authToken,TaskController.create)
router.get('/tasks/project/:projectId',authToken,TaskController.getAllTask)
router.get('/tasks/:taskId',authToken,TaskController.getTaskById)
router.put('/tasks/:taskId',authToken,TaskController.updateTask)
router.delete('/tasks/:taskId',authToken,TaskController.deleteTask)

export default router;


//37471be1-f9e0-4dad-bf90-7d84acfac627