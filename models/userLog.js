import { DataTypes } from "sequelize";

export const createUserLogModel = (sequelize) => {
  const UserLog = sequelize.define("UserLog", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,         
    tableName: "user_logs",   
  });

  return UserLog;
};
