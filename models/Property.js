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
    },
    address: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    numberOfUnits: {
        type: DataTypes.INTEGER,  
    },
    rentalCost: {
        type: DataTypes.FLOAT,
    },
}, {
    sequelize,
    modelName: 'property'
})

export default Property;