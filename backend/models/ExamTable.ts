import { DataTypes } from "sequelize";
import sequelize from "../db.ts";
import User from "./User.ts";
import Room from "./Room.ts";
import ClassCode from "./ClassCode.ts";

// Define the ExamTable model
const ExamTable = sequelize.define("ExamTable", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  classCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ClassCode,
      key: "id",
    },
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room,
      key: "id",
    },
  },
}, {
  timestamps: true,
});

// Associations
ExamTable.belongsTo(User, { foreignKey: "userId" });
ExamTable.belongsTo(ClassCode, { foreignKey: "classCodeId" });
ExamTable.belongsTo(Room, { foreignKey: "roomId" });

User.hasMany(ExamTable, { foreignKey: "userId" });
ClassCode.hasMany(ExamTable, { foreignKey: "classCodeId" });
Room.hasMany(ExamTable, { foreignKey: "roomId" });

export default ExamTable;
