import express from 'express';
const router = express.Router();

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// Auth & Register
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/register', registerUser);

// Profile
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin: list users
router.route('/')
  .get(protect, admin, getUsers);

// Admin: manage user by ID
router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
