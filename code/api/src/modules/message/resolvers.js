// App Imports
import models from '../../setup/models'

// Get Messages by user
export async function getById(parentValue, { }, { auth }) {

  var res = await models.Message.findAll({
    attributes: [
      [models.Sequelize.fn('MAX', models.Sequelize.col('messages.createdAt')), 'maxdate'],
    ],
    where: {
      [models.Sequelize.Op.or]: {
        senderId: auth.user.id,
        receiverId: auth.user.id
      }
    },
    group: [
      ['discussionCode']
    ],
  })
  var dates = [];
  res.map(el => {
    dates.push(el.dataValues.maxdate)
  })

  var messages = await models.Message.findAll({

    where: {
      [models.Sequelize.Op.or]: {
        senderId: auth.user.id,
        receiverId: auth.user.id
      },
      createdAt: {
        [models.Sequelize.Op.in]: dates
      }
    },
    include: [{
      model: models.User,
      as: "sender",

    },
    {
      model: models.User,
      as: "receiver",

    }
    ],
    order: [
      ['createdAt', 'DESC']
    ],

  })
  return messages

}

// Get all Messages
export async function getAll() {

  return await models.Message.findAll({

    include: [
      {
        model: models.User, as: "sender",
      },
      {
        model: models.User, as: "receiver"
      }
    ],
    order: [
      ['id', 'DESC']
    ],
  })
}


// Get all Messages
export async function getDiscussion(parentValue, { discussionCode }, { auth }) {

  return await models.Message.findAll({
    where: {
      discussionCode,
      [models.Sequelize.Op.or]: {
        senderId: auth.user.id,
        receiverId: auth.user.id
      },
    },
    include: [{
      model: models.User,
      as: "sender"
    },
    {
      model: models.User,
      as: "receiver"
    }
    ],
    order : [
      ['id', 'asc']
    ]
  })

}


export async function NotSeenMessage(parentValue, { }, { auth }) {

  return await models.Message.findAll({
    where: {
      isSeen: false,
      receiverId: auth.user.id
    }, 
    attributes: [
      [models.Sequelize.fn('MAX', models.Sequelize.col('messages.createdAt')), 'maxdate'],
    ],
    group: ["discussionCode"],

  })

}

export async function setMessageSeen(parentValue, { discussionCode }, { auth }) {

  var t= await models.Message.update({
    isSeen: true,
  },{
    where: {
      discussionCode: discussionCode,
      receiverId: auth.user.id
    },
    include: [
      {
        model: models.User, as: "sender",
      },
      {
        model: models.User, as: "receiver"
      }
    ],
    order: [
      ['id', 'DESC']
    ],

  })


  console.log(discussionCode+ " "+auth.user.id);

  return t;

}


export async function ReadMessage(parentValue, { Ids }, { auth }) {

  return await models.Message.update({
    isSeen: true,
    isRead: true,
    where: {
      id: {
        [models.Sequelize.op.in]: [Ids]
      },
      receiverId: auth.user.id
    },
    include: [
      {
        model: models.User, as: "sender",
      },
      {
        model: models.User, as: "receiver"
      }
    ],
    order: [
      ['id', 'DESC']
    ],

  })

}

// Create message
export async function create(parentValue, {  receiverId, content }, { auth }) {
  if (true) {

    return await models.Message.create({
      senderId: auth.user.id,
      receiverId: receiverId,
      content,
    })

  }
}

// Delete Message
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Message.destroy({ where: { id } })
  } else {
    throw new Error('Operation denied.')
  }
}