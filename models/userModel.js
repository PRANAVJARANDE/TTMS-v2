import { DataTypes } from "sequelize";

export const createUserModel=(sequelize)=>{
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "supervisor", "user"),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: true,
    tableName: "users",
  });
  return User;
}


// MongoDB
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["admin", "supervisor", "user"],
    },
    location: {
      type: String,
    },
    allocatedTools: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tools",
      },
    ],
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
