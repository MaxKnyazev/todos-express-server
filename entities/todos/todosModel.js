import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js'

const Todo = database.define('todo', {
  todos_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  users_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  checked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  is_important: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

});

export { Todo };