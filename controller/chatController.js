import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { messageModel, userModel } from "../config/postgress.js"; 
import { sequelize } from "../config/postgress.js";

const createMessage = asyncHandler(async (req, res) => {
  try {
    const { content, replyOf } = req.body;
    console.log(replyOf);
    const userID=req.body.userID;
    if (!content) {
      return res.status(400).json(new ApiResponse(400, null, "Content is required"));
    }

   
    const newMessage = await messageModel.create({
      content,
      ownerId: userID,
      replyOfId: replyOf || null,
    });

    return res.status(200).json(new ApiResponse(200, newMessage, "Message created successfully"));
  } catch (error) {
    console.error("Error while creating message:", error);
    return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
  }
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    const [messages] = await sequelize.query(`
      SELECT 
        m.*,
        replied.content AS "replyOfContent"
      FROM 
        "messages" m
      LEFT JOIN 
        "messages" replied 
      ON 
        m."replyOfId" = replied."id"
      ORDER BY 
        m."createdAt" ASC
    `);
    
    
    if (messages.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], "No Messages found"));
    }

    return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json(new ApiResponse(500, null, "Failed to fetch messages"));
  }
});

export { createMessage, getMessages };