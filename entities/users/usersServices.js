import { database } from '../../database/database.js';
import { User } from './usersModel.js';
import { QueryTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

class UsersServices {
  getAllUsers = async () => {
    // const sql = `SELECT * FROM users`;
    // const users = await database.query(sql, { type: QueryTypes.SELECT });

    const users = await User.findAll({
      raw: true,
    });
    return users;
  }

  getUser = async (id) => {
    // const sql = `SELECT * FROM users WHERE id='${id}'`;
    // const user = await database.query(sql, { type: QueryTypes.SELECT });

    const user = await User.findOne({ 
      where: { id } 
    });
    return user.dataValues;
  }

  registerUser = async ({ email, password }) => {
    const id = uuidv4();
    const hashPassword = bcrypt.hashSync(password, 10);

    // const sql = `INSERT INTO users (id, email, password) VALUES ('${id}', '${email}', '${hashPassword}')`;
    // await database.query(sql, { type: QueryTypes.INSERT });

    const user = await User.create({ 
      id, 
      password: hashPassword,
      role: 'user',
      email, 
    });

    return user.dataValues;
  }

  deleteUser = async ({ id }) => {
    // const sql = `DELETE FROM users WHERE id='${id}'`;
    // await database.query(sql, { type: QueryTypes.DELETE });

    await User.destroy({
      where: {
        id,
      }
    });

    return {
      message: `Пользователь с id ${id} удален`
    };
  }

  editUser = async ({ id, email, password }) => {
    const hashPassword = bcrypt.hashSync(password, 10);

    // const sql = `UPDATE users SET email='${email}', password='${hashPassword}' WHERE id='${id}'`;
    // await database.query(sql, { type: QueryTypes.UPDATE });

    await User.update({ 
      email,
      password: hashPassword,
    }, {
      where: {
        id
      }
    });

    const user = {
      id, 
      email
    }

    return user;
  }

  loginUser = async ({ email, password }) => {
    // const sql = `SELECT * FROM users WHERE email='${email}'`;
    // const user = await database.query(sql, { type: QueryTypes.SELECT });

    const user = await User.findOne({ 
      where: { 
        email
      } 
    });

    console.log(user);

    if (!user) {
      return {
        error: `Пользователя с таким email не существует`
      };
    }

    const validPassword = bcrypt.compareSync(password, user.dataValues.password);

    if (!validPassword) {
      return {
        error: `Логин или пароль неверный`
      };
    }

    return {
      message: `Успешная авторизация`,
      role: user.dataValues.role,
      email: user.dataValues.email,
    }
  }
}

export default new UsersServices();