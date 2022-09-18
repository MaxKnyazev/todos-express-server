import Router from 'express';
import usersControllers from './usersControllers.js';

const usersRoutes = Router();

usersRoutes.route('/')
  .get(usersControllers.getAllUsers);

usersRoutes.route('/:id')
  .get(usersControllers.getUser);

usersRoutes.route('/register')
  .post(usersControllers.registerUser);

usersRoutes.route('/delete/:id')
  .delete(usersControllers.deleteUser);

usersRoutes.route('/edit/:id')
  .put(usersControllers.editUser);

usersRoutes.route('/login')
  .post(usersControllers.loginUser);

export { usersRoutes };