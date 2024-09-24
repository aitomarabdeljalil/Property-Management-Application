import sequelize from './db';
const Property = require('./models/Property');

// Sync all models
const syncDB = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
};

syncDB();