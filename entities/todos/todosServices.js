import { Todo } from './todosModel.js';
import { v4 as uuidv4 } from 'uuid';

class TodosServices {
  getAllTodos = async () => {
    const todos = await Todo.findAll({
      raw: true,
    });
    return todos;
  }
}

export default new TodosServices();