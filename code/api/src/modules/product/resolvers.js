// App Imports
import params from '../../config/params'
import models from '../../setup/models'
import model from '../message/model'

// Get all products
export async function getAll(parentValue, { transactionType, limit }, { auth }) {

    var options = {};
    if (transactionType != undefined) {
        if (transactionType > 0)
            options = {
                where: {
                    id: transactionType
                }
            }
    }

    return await models.Product.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: limit != undefined ? limit : 25,

        include: [{
            model: models.Category,
            as: 'categories',
        },
        {
            model: models.User,
            as: 'user',

        },
        {
            model: models.TransactionType,
            as: 'transactionType',
            ...options

        }],

    })


}




// Get more  products
export async function showMore(parentValue, { productId, transactionType }) {

    if (transactionType != 0) {
        if (transactionType == 1) {
            return await models.Product.findAll({
                order: [
                    ['id', 'DESC']
                ],
                limit: 4,
                where: {
                    id:
                    {
                        [models.Sequelize.Op.lt]: productId
                    }
                },
                include: [{
                    model: models.Category,
                    as: 'categories',
                },
                {
                    model: models.User,
                    as: 'user',

                },
                {
                    model: models.TransactionType,
                    as: 'transactionType',
                    where: {
                        id: 1
                    }
                }]
            })
        }
        else if (transactionType == 2) {
            return await models.Product.findAll({
                order: [
                    ['id', 'DESC']
                ],
                limit: 4,
                where: {
                    id:
                    {
                        [models.Sequelize.Op.lt]: productId
                    }
                },
                include: [{
                    model: models.Category,
                    as: 'categories',
                },
                {
                    model: models.User,
                    as: 'user',

                },
                {
                    model: models.TransactionType,
                    as: 'transactionType',
                    where: {
                        id: 2
                    }


                }]

            })

        }
    } else {
        return await models.Product.findAll({
            order: [
                ['id', 'DESC']
            ],
            limit: 4,
            where: {
                id:
                {
                    [models.Sequelize.Op.lt]: productId
                }
            },
            include: [{
                model: models.Category,
                as: 'categories',
            },
            {
                model: models.User,
                as: 'user',

            },
            {
                model: models.TransactionType,
                as: 'transactionType',

            }]

        })
    }
}
// Product management
export async function singleUserProducts(parentValue, { id }, { auth }) {
    if (true) {

        var products = await models.Product.findAll({
            where: {
                userId: id
            },
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model: models.Category,
                as: 'categories',

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
        return products;
    }
}
// Get product by id
export async function getProductById(parentValue, { id } ) {
    const product = await models.Product.findOne({
        where: { id: id },
        include: [{
            model: models.Category,
            as: 'categories',

        },
        {
            model: models.User,
            as: 'user',

        },
        {
            model: models.TransactionType,
            as: 'transactionType',

        },

        {
            model: models.ProductImage,
            as: 'productImages',


        }
        ]

    })
    console.log(product)

    if (!product) {
        // Product does not exists
        throw new Error('The product you are looking for does not exists or has been discontinued.')
    } else {
        return product
    }
}

// Get product by ID
export async function getById(parentValue, { productId }) {
    const product = await models.Product.findOne({
        where: { id: productId },
        include: [{
            model: models.Category,
            as: 'categories',

        },
        {
            model: models.User,
            as: 'user',

        },
        {
            model: models.TransactionType,
            as: 'transactionType',

        },

        {
            model: models.ProductImage,
            as: 'productImages',


        }
        ]


    })

    if (!product) {
        // Product does not exists
        throw new Error('The product you are looking for does not exists or has been discontinued.')
    } else {
        return product
    }
}

// Get related products
export async function getRelated(parentValue, { productId }) {

    var productCategories = await models.ProductCategory.findAll({
        where: {
            productId
        }
    })


    var catIds = [];

    productCategories.forEach(el => {
        catIds.push(el.categoryId);
    });

    return await models.Product.findAll({
        where: {

            id: {
                [models.Sequelize.Op.not]: productId
            }
        },
        include: [{
            model: models.Category,
            as: 'categories',
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
        ],
        limit: 3,
        order: [
            [models.Sequelize.fn('RAND')]
        ] // mock related products by showing random products
    })
}

// Create product
export async function create(parentValue, { name, slug, description, transactionType, type, price, gender, image, categoriesIds, productImages }, { auth }) {
    if (true) {



        var product = await models.Product.create({
            name,
            slug,
            description,
            type,
            price,
            gender,
            image,
            transactionTypeId: transactionType,
            userId: auth.user.id,


        })

        var res = await models.ProductCategory.destroy({
            where: { productId: product.id }
        }).then(() => {
            JSON.parse(categoriesIds).forEach((categoryId) => {
                models.ProductCategory.create({
                    productId: product.id,
                    categoryId
                })

            });

        })

        var res2 = await models.ProductImage.destroy({
            where: { productId: product.id }
        }).then(() => {
            JSON.parse(productImages).forEach((productImage) => {

                models.ProductImage.create({
                    productId: product.id,
                    image: productImage
                })

            });

        })


        // this will return just product fields without product categories
        return product;

    } else {
        throw new Error('Operation denied.')
    }
}

// Update product
export async function update(parentValue, { id, name, slug, categoriesIds, transactionType, description, type, price, gender, image, productImages }, { auth }) {
    if (true) {


        var product = await models.Product.update({
            name,
            slug,
            description,
            type,
            price,
            gender,
            image,
            transactionTypeId: transactionType,
        }, {
            where: { id }
        });



        var res = await models.ProductCategory.destroy({
            where: { productId: id }
        }).then(() => {
            JSON.parse(categoriesIds).forEach((categoryId) => {
                models.ProductCategory.create({
                    productId: id,
                    categoryId
                })

            });

        })

        var res2 = await models.ProductImage.destroy({
            where: { productId: id }
        });

        var obj = JSON.parse(productImages)
        console.log(typeof array)
        for (let i = 0; i < obj.length; i++) {
            console.log(obj[i].image.toString() + "haha" + i)
            models.ProductImage.create({
                productId: parseInt(id),
                image: obj[i].image.toString()

            })
                .catch(function (err) {
                    // print the error details
                    console.log(err)
                })

        }
        /// here product value will be 1 or 0 
        return product;

    } else {
        throw new Error('Operation denied.')
    }
}

// Delete product
export async function remove(parentValue, { id }, { auth }) {
    if (true) {
        const product = await models.Product.findOne({ where: { id } })

        if (!product) {
            // Product does not exists
            throw new Error('The product does not exists.')
        } else {
            return await models.Product.destroy({ where: { id } })
        }
    } else {
        throw new Error('Operation denied.')
    }
}

// Product types
export async function getTypes() {
    return Object.values(params.product.types)
}




export async function findProduct(parentValue, { search, categoryId, transactionType = 1 }) {

    console.log(search + categoryId)

    if (categoryId == 0)
        categoryId = null
    var options = {
        where: {},

        include: [
            {
                model: models.User,
                as: 'user',

            },
            {
                model: models.TransactionType,
                as: 'transactionType',
                where: {
                    id: transactionType
                }
            }
        ],
        order: [['createdAt', 'DESC']]
    }
    if (categoryId != null) {

        if (search != null) {
            options.where = {
                name: {
                    [models.Sequelize.Op.like]: "%" + search + "%"

                }


            }
        }

        options.include.push(
            {
                model: models.Category,
                as: 'categories',
                where: {
                    [models.Sequelize.Op.or]: [

                        {
                            id: categoryId // node == id if it s a parent category
                        },
                        {
                            node: {
                                [models.Sequelize.Op.like]: categoryId + ".%"
                            }
                        },
                        {
                            node: {
                                [models.Sequelize.Op.like]: "%." + categoryId + ".%"
                            }
                        },
                        {
                            node: {
                                [models.Sequelize.Op.like]: "%." + categoryId
                            }
                        }

                    ]
                }


            })
    }
    else {

        var cat = await models.Category.findOne({
            where: {
                name: {
                    [models.Sequelize.Op.like]: "%" + search + "%"

                }
            }
        })
        if (cat == null)
            cat = {
                id: 0
            }
        console.log(cat.id)

        if (search != null) {
            options.where = {
                [models.Sequelize.Op.or]: [
                    {
                        name: {
                            [models.Sequelize.Op.like]: "%" + search + "%"

                        }
                    }
                    ,
                    {
                        description: {
                            [models.Sequelize.Op.like]: "%" + search + "%"

                        }
                    },
                    {
                        '$categories.node$': {
                            [models.Sequelize.Op.like]: cat.id + ".%"
                        }
                    },
                    {
                        '$categories.node$': {
                            [models.Sequelize.Op.like]: "%." + cat.id + ".%"
                        }
                    },
                    {
                        '$categories.node$': {
                            [models.Sequelize.Op.like]: "%." + cat.id
                        }
                    }

                ]

            }
        }
        options.include.push(
            {
                model: models.Category,
                as: 'categories',
            })
    }

    const products = await models.Product.findAll(
        {
            ...options
        }
    );

    var pr = {
        products: products,
        count: products.length ? products.length : 0
    }
    console.log(pr.products.length)
    return pr;

}





/// FOR CLIENTS

// Create product
export async function userNewProduct(parentValue, { name, slug, description, type, price, gender, image, categoriesIds, transactionType }, { auth }) {
    if (true) {


        var product = await models.Product.create({
            name,
            slug,
            description,
            type,
            price,
            gender,
            image,
            userid: auth.user.id,
            transactionTypeId: transactionType,

        })
        console.log(product.name)

        var res = await models.ProductCategory.destroy({
            where: { productId: product.id }
        })
        var ProductCategory = null;

        JSON.parse(categoriesIds).forEach(async (categoryId) => {

            ProductCategory = await models.ProductCategory.create({
                productId: product.id,
                categoryId
            })

        });

        // this will return just product fields without product categories
        return product;

    } else {
        throw new Error('Operation denied.')
    }
}

// Update product
export async function userUpdateProduct(parentValue, { id, name, slug, categoriesIds, description, type, price, gender, image }, { auth }) {
    if (auth.user && auth.user.role === params.user.roles.user) {


        var product = await models.Product.update({
            name,
            slug,
            description,
            type,
            price,
            gender,
            image
        }, {
            where: { id, userId: auth.user.id }
        });




        var res = await models.ProductCategory.destroy({
            where: { productId: id }
        })
        var ProductCategory = null;

        JSON.parse(categoriesIds).forEach(async (categoryId) => {

            ProductCategory = await models.ProductCategory.create({
                productId: id,
                categoryId
            })

        });

        /// here product value will be 1 or 0 
        return product

    } else {
        throw new Error('Operation denied.')
    }
}

// Delete product
export async function userRemoveProduct(parentValue, { id }, { auth }) {
    if (auth.user && auth.user.role === params.user.roles.user) {

        return await models.Product.destroy({ where: { id, userId: auth.user.id } })

    } else {
        throw new Error('Operation denied.')
    }
}