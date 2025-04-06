import JWT from "jsonwebtoken";
import { sequelize } from "../config/postgress.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Auth failed",
          err,
        });
      } else {
        req.body.userID = decode.userID;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Auth failed",
      error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userID = req.body.userID;
    const [results] = await sequelize.query(`SELECT * FROM users WHERE id = ${userID}`);
    const user = results[0];
    if (user?.role === "admin") { 
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorised Access for Admin",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting roles",
      error,
    });
  }
};

export const isSupervisor = async (req, res, next) => {
  try {
    const userID = req.body.userID;
    const [results] = await sequelize.query(`SELECT * FROM users WHERE id = ${userID}`);
    const user = results[0];
    if (user?.role === "supervisor") next();
    else {
      return res.status(401).send({
        success: false,
        message: "Unuthorised Access for Supervisor",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting roles",
      error,
    });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const userID = req.body.userID;
    const [results] = await sequelize.query(`SELECT * FROM users WHERE id = ${userID}`);
    const user = results[0];
    if (user?.role === "user") next();
    else {
      return res.status(401).send({
        success: false,
        message: "Unuthorised Access for User",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting roles",
      error,
    });
  }
};