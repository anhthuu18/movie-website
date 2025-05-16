import express from 'express';
import { login, logout, signup, getCurrentUser, updateProfile, changePassword } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

// Profile routes with slug
router.get('/:slug/profile', protectRoute, getCurrentUser);
router.put('/:slug/profile/update', protectRoute, updateProfile);

// Change password route
router.patch('/user/change-password', protectRoute, changePassword);

export default router;