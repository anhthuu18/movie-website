import express from 'express';
import { toggleUserLock, getUsers, createAdmin } from '../controllers/adminController.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Apply both protectRoute and adminAuth middleware to all admin routes
router.use(protectRoute, adminAuth);

// User management routes
router.get('/users', getUsers);
router.post('/users/create', createAdmin);
router.patch('/users/:userId', toggleUserLock);

export default router; 