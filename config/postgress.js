import { Sequelize } from "sequelize";
import { createUserModel } from "../models/userModel.js";
import { createUserLogModel } from "../models/userLog.js";
import { createMessageModel } from "../models/Message.js";
import { createDeviceModel } from "../models/Device.js";
import { createAllocationHistoryModel } from "../models/AllocationHistory.js";
import { createToolModel } from "../models/Tools.js";
export const sequelize = new Sequelize('postgres', 'postgres', 'YOUR-PASSWORD-LOCAL-SQL', {
    host: 'localhost',
    dialect: 'postgres' 
  });

export let userModel=null;
export let userLogModel=null;
export let messageModel=null;
export let deviceModel=null;
export let allocationHistoryModel=null;
export let toolsModel=null;

export const connectionToPostgress =  async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        userModel=await createUserModel(sequelize);
        userLogModel=await createUserLogModel(sequelize);
        messageModel=await createMessageModel(sequelize);
        deviceModel=await createDeviceModel(sequelize);
        allocationHistoryModel=await createAllocationHistoryModel(sequelize);
        toolsModel=await createToolModel(sequelize);
        await sequelize.sync();
        
        console.log("Database synced")
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }