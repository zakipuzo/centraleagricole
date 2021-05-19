// App Imports
import models from '../../setup/models'

import { getSubcats } from '../category/resolvers'

// Get productcategories by product
export async function getByProduct(parentValue, { productId }) {

    return await models.ProductCategory.findAll({
        where: {
            productId: productId,
        },
        include: [
            { model: models.Product, as: 'product' },
            { model: models.Category, as: 'category' },
        ]
    })

}

// Get productcategories by category
export async function getByCategory(parentValue, { categoryId }) {
    var product =  models.product;
  
    return await getSubcats(null, { categoryId })
        .then(subCategories => {
            var catIds = [];
            //push parent cat first
            catIds.push(categoryId);
            // look for subcategories
            if (subCategories != null) {
                console.log(JSON.stringify(subCategories));
              
                //push subcategories
                subCategories.map(el => {
                    console.log(el.id)
                    catIds.push(el.id);
                });
                
                console.log(catIds)
                return models.Product.findAll({
                    include: [{
                        model: models.Category,
                        as: "categories",
                        where: {
                            id: {
                                [models.Sequelize.Op.in]: catIds
                            }
                        }
                    },
                    {
                        model: models.User,
                        as: 'user',
            
                    },
                    {
                        model: models.TransactionType,
                        as: 'transactionType',
            
                    }

                    ]
                })
            }
            else {
                return models.Product.findAll({

                    include: [{
                        model: models.ProductCategory,
                        where: {
                            categoryId,
                        },
                    },
                    {
                        model: models.User,
                        as: 'user',
            
                    },
                    {
                        model: models.TransactionType,
                        as: 'transactionType',
            
                    }
                    ]
                })
            }

        });
   

}

// Get all productcategoriess
export async function getAll() {
    return await models.ProductCategory.findAll({
        include: [
            { model: models.Product, as: 'product' },
            { model: models.Category, as: 'category' },
        ],
        order: ['productId', 'categoryId']
    })
}

// Create productcategories
export async function create(parentValue, { productId, categoryIds }) {


    if (categoryIds.length > 0) {

        models.ProductCategory.destroy({
            where: { productId }
        })

        let ProductCategory;
        categoryIds.forEach(categoryId => {

            ProductCategory = models.ProductCategory.create({
                productId,
                categoryId
            })

            if (!ProductCategory.id) {
                return ProductCategory
            }
        });

        return ProductCategory;
    } else {
        throw new Error('Please insert a category.')
    }

}


// Delete productcategories
export async function remove(parentValue, { id }) {

    return await models.ProductCategory.destroy({ where: { id } })

}