import { sequelize } from ".";
import { Model, DataTypes } from "sequelize";

// Create Auth model
class Auth extends Model {}
Auth.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  { sequelize, modelName: "Auth" }
);

export { Auth };
