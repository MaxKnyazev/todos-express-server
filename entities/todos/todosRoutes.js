import Router from 'express';
import todosControllers from './todosControllers.js';

const todosRoutes = Router();

todosRoutes.route('/')
  .get(todosControllers.getAllTodos);

todosRoutes.route('/:id')
  .get(todosControllers.getTodo);

todosRoutes.route('/create')
  .post(todosControllers.createTodo);

todosRoutes.route('/delete/:id')
  .delete(todosControllers.deleteTodo);

todosRoutes.route('/edit/:id')
  .put(todosControllers.editTodo);


todosRoutes.route('/getUserTodos/:id')
  .get(todosControllers.getUserTodos);

export { todosRoutes };