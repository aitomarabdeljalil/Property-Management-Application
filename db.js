import { Sequelize } from 'sequelize';


// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.PORT
});

export default sequelize;