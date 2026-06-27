import express from 'express'
import UserController from '../controller/UserController.js'
import AuthController from  '../controller/AuthController.js'
import '../middleware/authToken.js'
import authToken from '../middleware/authToken.js';

const router = express.Router();

router.get('/health',(req,res) => {
    res.status(200).json({message: "API online"})
})

router.get('/users',authToken, UserController.getAll)

router.get('/users/:id',authToken, UserController.getById)

router.get('/auth/me',authToken, AuthController.me)

router.post('/users/email',authToken, UserController.getByEmail)

router.post('/users', UserController.create)

router.post('/auth/login', AuthController.login)

export default router;
