import express from 'express'
import UserController from '../controller/UserController.js'

const router = express.Router();

router.get('/health',(req,res) => {
    res.status(200).json({message: "API online"})
})

router.get('/users', UserController.getAll)

router.get('/users/:id', UserController.getById)

router.post('/users', UserController.create)

export default router;