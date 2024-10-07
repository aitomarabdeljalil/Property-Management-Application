import sequelize from "../db.js";
import { Model, DataTypes } from "sequelize";
import Tenant from "./Tenant.js";

class Payment extends Model {}
// Define the Payment model
Payment.init({
    // Define columns and their types
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    datePaid: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    isSettled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'payment'
})

// Associate payment with tenant
Payment.belongsTo(Tenant, { foreignKey: 'tenantId' });
Tenant.hasMany(Payment, { foreignKey: 'tenantId' })

export default Payment;