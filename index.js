import express from 'express';
import chalk from 'chalk';
import { database } from './database/database.js';
import { usersRoutes } from './entities/users/usersRoutes.js';
import cors from 'cors';
import { User } from './entities/users/usersModel.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', usersRoutes);

const start = async () => {
  try {
    await database.authenticate();
    console.log(chalk.bgGreen('Connection has been established successfully.'));
    
    await User.sync({ alter: true })
    console.log(chalk.bgGreen('User model has been synchronized successfully'));


    app.listen(PORT, () => {
      console.log(chalk.bgGreen(`Server listening on port=${PORT}`))
    });
  } catch (error) {
    console.error(chalk.bgRed('Unable to connect to the database:'), error);
  }
}

start();