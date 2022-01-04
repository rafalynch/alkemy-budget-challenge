import { sequelize } from ".";
import { Model, DataTypes } from "sequelize";

// Create User model
class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
  },
  { sequelize, modelName: "User" }
);

export { User };
