import todosServices from './todosServices.js';

class TodosControllers {
  getAllTodos = async (req, res) => {
    try {
      const todos = await todosServices.getAllTodos();
      return res.status(200).json({
        todos,
        error: null
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  }

  getTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await todosServices.getTodo(id);

      if (!todo) {
        return res.status(400).json({
          error: `Todo с id ${id} не обнаружен`
        });
      }
    
      return res.status(200).json({
        todo,
        error: null
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  }

  createTodo = async (req, res) => {
    try {
      const { users_id, value, title, is_important } = req.body;

      if (!title) {
        return res.status(400).json({
          error: `Не передан заголовок title`
        });
      }

      const todo = await todosServices.createTodo({ users_id, value, title, is_important });

      return res.status(200).json({
        todo,
        error: null
      });  
    } catch (error) {
      return res.status(500).json({error})
    }
  }

  deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: `Параметр id не передан`
        })
      }

      const result = await todosServices.deleteTodo({ id });

      return res.status(200).json({
        ...result,
        error: null
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  }

  editTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, value, is_important } = req.body;

      if (!title) {
        return res.status(400).json({
          error: 'Параметр title не передан'
        })
      }

      const todo = await todosServices.editTodo({ id, title, value, is_important });

      return res.status(200).json({
        todo,
        error: null
      })
    } catch (error) {
      return res.status(500).json({error})
    }
  }

  getUserTodos = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: 'Параметр id не передан'
        })
      }

      const todos = await todosServices.getUserTodos({ id });

      return res.status(200).json({
        todos,
        error: null
      })
    } catch (error) {
      return res.status(500).json({error})
    }
  }
}

export default new TodosControllers();