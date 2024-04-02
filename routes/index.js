import express from 'express';
const router = express.Router();
import { loginController, registerController } from '../controllers';
import userController from '../controllers/auth/userController';


router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.get('/getUser', userController.getUser)

export default router;