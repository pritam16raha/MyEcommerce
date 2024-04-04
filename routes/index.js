import express from 'express';
const router = express.Router();
import { loginController, registerController } from '../controllers';
import userController from '../controllers/auth/userController';
import userAuth from '../middleware/userAuth';


router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.get('/getUser', userAuth, userController.getUser)

export default router;