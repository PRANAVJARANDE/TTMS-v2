import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import { userModel, userLogModel } from "../config/postgress.js"; 
import { v4 as uuidv4 } from "uuid";

export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== req.body.role) {
      return res.status(400).send({
        success: false,
        message: "Role does not match",
      });
    }

    const valid = await comparePassword(req.body.password, user.password);
    if (!valid) {
      return res.status(400).send({
        success: false,
        message: "Password is wrong",
      });
    }

    const token = JWT.sign({ userID: user.id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    const log = await userLogModel.create({
      message: `${user.role} logged in with ID: ${user.username}`,
    });

    res.status(200).send({
      success: true,
      message: "Login successfull",
      user,
      token,
      log,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in logging in",
      error,
    });
  }
};

export const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exists! Please login.",
      });
    }

    const hashedPassword = await hashPassword(req.body.password);
    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const log = await userLogModel.create({
      id: req.body.username,
      message: `Admin ${req.body.userID} Registered a ${req.body.role} with ID: ${req.body.username}`,
    });

    res.status(201).send({
      success: true,
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in registering",
      error,
    });
  }
};