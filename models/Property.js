import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';


class Property extends Model {}
// Define the Property model
Property.init({
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
}, {
    sequelize,
    modelName: 'property'
})

export default Property;