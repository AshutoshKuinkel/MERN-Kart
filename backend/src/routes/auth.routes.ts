import express from 'express';
import { register,login, logout, profile } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { AllUsersAdmins } from '../types/global.types';

const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.post('/logout', logout)
router.get('/me',authenticate(AllUsersAdmins),profile)

export default router;