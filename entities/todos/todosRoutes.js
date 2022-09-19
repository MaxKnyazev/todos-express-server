import Router from 'express';
import todosControllers from './todosControllers.js';

const todosRoutes = Router();

todosRoutes.route('/')
  .get(todosControllers.getAllTodos);

todosRoutes.route('/create')
  .post(todosControllers.createTodo);

export { todosRoutes };