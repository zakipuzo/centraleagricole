'use strict'

// cart
module.exports = function(sequelize, DataTypes) {
  let Message = sequelize.define('messages', {
    senderId: {
      type: DataTypes.INTEGER
    },
    receiverId: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.TEXT
    },
    discussionCode: {
      type: DataTypes.INTEGER
    },
    isSeen: {
      type: DataTypes.BOOLEAN
    },
    isRead: {
      type: DataTypes.BOOLEAN
    },
    
  })

  Message.associate = function(models) { 
    Message.belongsTo(models.User, {as: "sender", foreignKey : "senderId"})
      
    Message.belongsTo(models.User,  { as: "receiver", foreignKey : "receiverId"})


  }

  

  return Message
}