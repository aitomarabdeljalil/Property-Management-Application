import sequelize from "../db.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {}
// Define the User model
User.init({
    // Define columns and their types
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'user'
})

// Hash the password before saving the user
User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

export default User;