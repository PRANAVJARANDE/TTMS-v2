import { DataTypes } from "sequelize";

export const createAllocationHistoryModel = (sequelize) => {
  const AllocationHistory = sequelize.define("AllocationHistory", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toolsAllocated: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: false,
    },
    allocatedFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    allocatedUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    extendedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
    tableName: "allocation_histories",
  });

  return AllocationHistory;
};