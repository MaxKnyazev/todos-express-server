import { User } from '../users/usersModel.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

class AuthServices {
  registerUser = async ({email, password }) => {
    const id = uuidv4();
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      users_id: id,
      password: hashPassword,
      role: 'user',
      email,
    });

    return user.dataValues;
  }

  loginUser = async ({ email, password }) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    console.log(user);

    if (!user) {
      return {
        error: `Пользователя с таким email не существует`,
      }
    }

    const validPassword = bcrypt.compareSync(
      password,
      user.dataValues.password
    );

    if (!validPassword) {
      return {
        error: `Логин или пароль неверный`,
      }
    }

    const accessToken = jwt.sign(
      {
        id: user.dataValues.users_id,
        email: user.dataValues.email
      }, 
      process.env.SECRET_KEY, 
      {
        expiresIn: '30m'
      }
    );

    return {
      message: `Успешная авторизация`,
      accessToken,
      role: user.dataValues.role,
      email: user.dataValues.email,
    }
  }
}

export default new AuthServices();