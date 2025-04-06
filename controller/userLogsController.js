import { userLogModel } from "../config/postgress.js"; 

export const logsController = async (req, res) => {
  try {
    const {message}=req.body;
    const log = await userLogModel.create({message});
    res.status(200).send({
      success: true,
      message: "Logs saved successfully",
      log,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Cannot mark",
      error,
    });
  }
};

export const readLogsController = async (req, res) => {
  try {
    const allLogs = await userLogModel.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send({
      success: true,
      message: "Logs Received",
      allLogs,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Cannot read logs",
      error,
    });
  }
};