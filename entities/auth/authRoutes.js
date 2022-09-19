import Router from 'express';
import authControllers from './authControllers.js';

const authRoutes = Router();

authRoutes.route('/register')
  .post(authControllers.registerUser);

authRoutes.route('/login')
  .post(authControllers.loginUser);

export { authRoutes };