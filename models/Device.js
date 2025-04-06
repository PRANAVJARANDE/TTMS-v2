import { DataTypes } from "sequelize";

export const createDeviceModel = (sequelize) => {
  const Device = sequelize.define("Device", {
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    macId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  }, {
    timestamps: true, 
    tableName: "devices",
  });

  return Device;
};


