import { Model, DataTypes } from 'sequelize';
import Property from './Property.js';
import sequelize from '../db.js';


class Tenant extends Model {}
// Define the Tenant model
Tenant.init({
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
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sectionOccupied: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'tenant'
})

Tenant.belongsTo(Property, { foreignKey: 'propertyId' });
Property.hasMany(Tenant, { foreignKey: 'propertyId' });

export default Tenant;