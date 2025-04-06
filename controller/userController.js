import { userModel } from "../config/postgress.js"; 

export const getUsersController = async (req, res) => {
  try {
    const users = await userModel.findAll({
      where: { role: "user" },
    });

    res.status(200).send({
      success: true,
      message: "All users",
      user: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting users",
      error,
    });
  }
};