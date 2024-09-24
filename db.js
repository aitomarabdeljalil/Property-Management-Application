import { Sequelize } from 'sequelize';


// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export default sequelize;