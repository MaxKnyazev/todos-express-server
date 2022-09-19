import usersServices from './usersServices.js';

class UsersControllers {
  getAllUsers = async (req, res) => {
    try {
      const users = await usersServices.getAllUsers();
      return res.status(200).json({
        users,
        error: null
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  }

  getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersServices.getUser(id);

      if (!user) {
        return res.status(500).json({
          error: `Пользователь с id ${id} не обнаружен`
        });
      }
    
      return res.status(200).json({
        user,
        error: null
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: `Параметр id не передан`
        })
      }

      const result = await usersServices.deleteUser({ id });

      return res.status(200).json({
        ...result,
        error: null
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  }

  editUser = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: `Параметр id не передан`
        })
      }

      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          error: `Неверный email или password`
        });
      }

      const user = await usersServices.editUser({ id, email, password });

      return res.status(200).json({
        user,
        error: null
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  }
}

export default new UsersControllers();