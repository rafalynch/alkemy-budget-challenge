import { sequelize } from ".";
import { Model, DataTypes } from "sequelize";

// Create Record model
class Record extends Model {}
Record.init(
  {
    concept: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATEONLY,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
  },
  { sequelize, modelName: "Record" }
);

export { Record };
