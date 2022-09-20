import Router from 'express';
import authControllers from './authControllers.js';
import { check } from 'express-validator';

const authRoutes = Router();

authRoutes.route('/register')
  .post([
    check('email', 'Email не может быть пустым').notEmpty(),
    check('password', 'Пароль не может быть пустым').notEmpty(),
    check('password', 'Длина пароля не может быть меньше 5-и символов').isLength({
      min: 5,
    })
  ], authControllers.registerUser);

authRoutes.route('/login')
  .post(authControllers.loginUser);

export { authRoutes };