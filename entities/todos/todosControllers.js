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

  createTodo = async (req, res) => {
    try {
      const { users_id, value, title } = req.body;

      if (!title) {
        return res.status(400).json({
          error: `Не передан заголовок title`
        });
      }

      const user = await todosServices.createTodo({ email, password });

      return res.status(200).json({
        user,
        error: null
      });  
    } catch (error) {
      return res.status(500).json({error})
    }
  }
}

export default new TodosControllers();