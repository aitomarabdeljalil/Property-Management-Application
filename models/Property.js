import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Define the Property model
const Property = sequelize.define('Property', {
  // Define columns and their types
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfUnits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rentalCost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Additional model options
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export default Property;