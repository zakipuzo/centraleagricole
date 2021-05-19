// Imports
import Sequelize, { where } from 'sequelize'

// App Imports
import databaseConnection from './database'

const models = {
    User: databaseConnection.import('../modules/user/model'),
    Product: databaseConnection.import('../modules/product/model'),
    Crate: databaseConnection.import('../modules/crate/model'),
    Subscription: databaseConnection.import('../modules/subscription/model'),
    Category: databaseConnection.import('../modules/category/model'),
    ProductCategory: databaseConnection.import('../modules/productcategory/model'),
    Cart: databaseConnection.import('../modules/cart/model'),
    CartItem: databaseConnection.import('../modules/cartitems/model'),
    TransactionType: databaseConnection.import('../modules/transactiontype/model'),
    Message: databaseConnection.import('../modules/message/model'),
    ProductImage: databaseConnection.import('../modules/productimage/model'),
    SavedProduct: databaseConnection.import('../modules/savedproduct/model'),
}

/// Zakaria Aarab
///for categories node for display in hiearchy exemple: the parent id=1 so its node=2 .. the subcategory id=5  so its node=2.5 ...
models.Category.addHook('afterCreate', async (cat, options) => {
    console.log("after create hook fired");
    if (!cat.categoryId) {
        await models.Category.update({ node: '' + cat.id }, {
            where: {
                id: cat.id
            }
        });
    } else {
        let category = await models.Category.findOne({ where: { id: cat.categoryId } })
        await models.Category.update({ node: category.node + '.' + cat.id }, {
            where: {
                id: cat.id
            }
        });
    }


});

// every discussion has its own code
models.Message.addHook('afterCreate', async (message, options) => {
    console.log("after create hook fired");

    await models.Message.update({
        discussionCode: Math.max(message.senderId, message.receiverId) * Math.min(message.senderId, message.receiverId) + Math.max(message.senderId, message.receiverId),
    },
        {
            where: {
                id: message.id
            }
        }

    )


});

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
})

models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models