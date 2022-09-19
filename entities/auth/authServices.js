import { User } from '../users/usersModel.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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
  };

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
      };
    }

    const validPassword = bcrypt.compareSync(
      password,
      user.dataValues.password
    );

    if (!validPassword) {
      return {
        error: `Логин или пароль неверный`,
      };
    }

    return {
      message: `Успешная авторизация`,
      role: user.dataValues.role,
      email: user.dataValues.email,
    };
  };
}

export default new AuthServices();