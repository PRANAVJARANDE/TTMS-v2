import express from "express";
import {
  logsController,
  readLogsController,
} from "../controller/userLogsController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createLogs",requireSignIn, logsController);
router.get("/readLogs",requireSignIn,isAdmin, readLogsController);

export default router;
