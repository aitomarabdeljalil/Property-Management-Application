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
    },
    contact: {
        type: DataTypes.STRING,
    },
    sectionOccupied: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'tenant'
})

Tenant.belongsTo(Property, { foreignKey: 'propertyId' });
Property.hasMany(Tenant, { foreignKey: 'propertyId' });

export default Tenant;