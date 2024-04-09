import express from 'express';
const router = express.Router();
import { loginController, refreshController, registerController } from '../controllers';
import userController from '../controllers/auth/userController';
import userAuth from '../middleware/userAuth';


router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.get('/getUser', userAuth, userController.getUser);

router.post('/getAccessToken', refreshController.refreshMethod);

export default router;