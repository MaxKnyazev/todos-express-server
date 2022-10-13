import authServices from './authServices.js';
import { validationResult } from 'express-validator';

class AuthControllers {
  registerUser = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors
        });
      }
      const { email, password } = req.body;

      // if (!email || !password) {
      //   return res.status(400).json({
      //     error: `Неверный email или password`
      //   });
      // }

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
      console.log(error);
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

  currentUser = async (req, res) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];

      if (!accessToken) {
        return res.status(401).json({
          error: 'Access token not provided',
        });
      }
      
      const result = await authServices.currentUser(accessToken);
      
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