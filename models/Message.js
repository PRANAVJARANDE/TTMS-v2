import { DataTypes } from "sequelize";

export const createMessageModel = (sequelize) => {
  const Message = sequelize.define("Message", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    replyOfId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  }, {
    timestamps: true,
    tableName: "messages",
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: "ownerId",
      as: "Owner",
    });

    // Self-association
    Message.belongsTo(models.Message, {
      foreignKey: "replyOfId",
      as: "RepliedMessage",
    });

    Message.hasMany(models.Message, {
      foreignKey: "replyOfId",
      as: "Replies",
    });
  };

  return Message;
};
