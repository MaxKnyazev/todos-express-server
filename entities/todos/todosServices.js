import { Todo } from './todosModel.js';
import { v4 as uuidv4 } from 'uuid';

class TodosServices {
  getAllTodos = async () => {
    const todos = await Todo.findAll({
      raw: true,
    });
    return todos;
  }

  getTodo = async (id) => {
    const todo = await Todo.findOne({ 
      where: { 
        todos_id: id 
      } 
    });
    return todo.dataValues;
  }

  createTodo = async ({ users_id, value, title, is_important = false }) => {
    const todos_id = uuidv4();

    const todo = await Todo.create({
      users_id,
      todos_id,
      value,
      title,
      is_important
    });

    return todo.dataValues;
  }

  deleteTodo = async ({ id }) => {
    await Todo.destroy({
      where: { 
        todos_id: id 
      }
    });

    return {
      message: `Todo с id ${id} удален`
    };
  }

  editTodo = async ({ id, title, value, is_important }) => {
    const todo = await Todo.update({
      title,
      value,
      is_important
    }, {
      where: {
        todos_id: id
      }
    })

    return {
      title,
      value,
      is_important,
      todos_id: id,
    }
  }

  getUserTodos = async ({ id }) => {
    const todos = await Todo.findAll({
      raw: true,
      where: {
        users_id: id
      }
    });
    return todos;
  }
}

export default new TodosServices();