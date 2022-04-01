import express from 'express';
import AuthController from '../controllers/auth_controller';
import UserController from '../controllers/user_controller';
import AuthMiddleware from '../middlewares/auth_middleware';

const router = express.Router();


router.post('/login', AuthController.signin);
// router.post('/signup', AuthController.signup); // Not needed
router.post('/logout', AuthMiddleware.isAuthenticated, AuthController.signout);
router.post('/user', AuthMiddleware.isAuthenticated, AuthController.getUser);
router.get('/authenticate', AuthMiddleware.isAuthenticated, AuthController.validateAuthentication);
router.get('/all', UserController.getAll);


export default router;
