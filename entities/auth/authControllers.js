import authServices from './authServices.js';

class AuthControllers {
  registerUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: `Неверный email или password`
        });
      }

      const user = await authServices.registerUser({ email, password });

      return res.status(200).json({
        user,
        error: null
      });  
    } catch (error) {
      if (error.errors[0].type === 'unique violation') {
        return res.status(400).json({
          error: `Пользователь с таким email уже существует`
        }) 
      }
      return res.status(500).json({error})
    }
  }

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: `Введите email или password`
        });
      }

      const result = await authServices.loginUser({ email, password });

      if (result.error) {
        return res.status(400).json({
          ...result,
        });
      }
      
      return res.status(200).json({
        ...result,
        error: null
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  }
}

export default new AuthControllers();