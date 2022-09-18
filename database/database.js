import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const database = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD, 
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    port: process.env.PORT_DB,
    define: {
      timestamps: true,
    }
  },
);

export { database };