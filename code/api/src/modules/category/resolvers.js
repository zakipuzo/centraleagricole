
/// Author : Zakaria aarab
/// Email : aarabzakaria7@gmal.com


// App Imports
import models from '../../setup/models'
import params from '../../config/params'
import model from './model'
import { Op } from "sequelize";


// Create Category
export async function create(parentValue, { name, categoryId, isActive }, { auth }) {
    if (auth.user && auth.user.role === params.user.roles.admin) {
        if (categoryId == 0)
            categoryId = null
        return await models.Category.create({
            name,
            categoryId,
            isActive
        })
    } else {
        throw new Error('Operation denied.')
    }
}

// Update Category
export async function update(parentValue, { id, name, categoryId, isActive }, { auth }) {

    var subcategories = getSubcats(null, { categoryId: id });
    subcategories.then(sub => { console.log(sub.length) })

    console.log(categoryId)
    if (auth.user && auth.user.role === params.user.roles.admin) {
        if (categoryId == null || categoryId == 0) {
            categoryId = null;
            return await models.Category.update({
                name,
                categoryId,
                node: '' + id,
                isActive
            }, {
                where: {
                    id
                }
            }).then(updated => {
                if (updated) {
                    subcategories.then(results => {
                        results.map(subcategory => {
                            //get category node and split by .
                            let nodes = subcategory.node.split(".");
                            // find id of parent in nodes
                            let nodeIndex=0;
                            for (let i = 0; i < nodes.length; i++) {
                                if (parseInt(nodes[i]) == id) {
                                    nodeIndex = i;
                                    break;
                                }

                            }

                            nodes = nodes.slice(nodeIndex);


                            let node_root = nodes.join(".")
                            models.Category.update({
                                node:  node_root
                            }, {
                                where: {
                                    id: subcategory.id
                                }
                            })
                        })

                    })

                }
            })
        } else {

            let newParentCat = await models.Category.findOne({ where: { id: categoryId } })

            return await models.Category.update({
                name,
                categoryId,
                node: newParentCat.node + '.' + id,
                isActive
            }, {
                where: {
                    id
                }
            }).then(updated => {
                if (updated) {
                    subcategories.then(results => {
                        results.map(subcategory => {
                            //get category node and split by .
                            let nodes = subcategory.node.split(".");
                            // find id of parent in nodes
                            let nodeIndex=0;
                            for (let i = 0; i < nodes.length; i++) {
                                if (parseInt(nodes[i]) == id) {
                                    nodeIndex = i;
                                    break;
                                }

                            }
                            nodes = nodes.slice(nodeIndex);

                            
                            let node_root = nodes.join(".")

                            models.Category.update({
                                node: newParentCat.node + "." + node_root
                            }, {
                                where: {
                                    id: subcategory.id
                                }
                            })
                        })

                    })

                }
            })
        }

    } else {
        throw new Error('Operation denied.')
    }
}

// Delete Category
export async function remove(parentValue, { id }, { auth }) {
    if (auth.user && auth.user.role === params.user.roles.admin) {
        return await models.Category.destroy({ where: { id } })
    } else {
        throw new Error('Operation denied.')
    }
}


// Get all categories order by parent category
export async function getAll() {
    return await models.Category.findAll({
        order: [
            ['node', 'ASC']
        ],
        include: [
            { model: models.Category, as: 'category' },
        ]
    }

    )
}

// Get all categories order by parent category
export async function getAllGeneral() {
    return await models.Category.findAll({
        order: [
            ['name', 'ASC']
        ],
        where: { categoryId: null },

    }

    )
}


// Get all categories order by parent category
export async function getCatByIds(parentValue, { categoryIds }) {
    return await models.Category.findAll({
        order: [
            ['name', 'ASC']
        ],
        where: {
            id: {
                [Op.in]: categoryIds
            }
        },

    }

    )
}

// Get category with parent object category by ID
export async function getById(parentValue, { categoryId }) {
    const category = await models.Category.findOne({
        where: { id: categoryId },
        include: [
            { model: models.Category, as: 'category' },
        ]
    }

    )
    if (!category) {
        // Product does not exists
        throw new Error('The category you are looking for does not exists or has been discontinued.')
    } else {
        return category
    }

}

// Get category with just parent category id by ID
export async function getSimpleCategoryById(parentValue, { id }) {
    const category = await models.Category.findOne({
        where: { id },

        include: [
            { model: models.Category, as: 'category' },
        ]
    }

    )

    if (!category) {
        // Product does not exists
        throw new Error('The category you are looking for does not exists or has been discontinued.')
    } else {
        return category
    }
}

//get subcategories

export async function getSubcats(parentValue, { categoryId }) {

    console.log(categoryId)
    const category = await models.Category.findOne({
        where:
        {
            id: categoryId
        }
    });


    if (category.id) {
        let options = {
            node: {
                [models.Sequelize.Op.like]: "" + category.node + ".%"
            }
        }
        console.log(options)
        var subcategories = await models.Category.findAll({
            where:
            {
                ...options
            }
        });

        if (!subcategories)
            throw new Error('the Categories has no Subcategories')
        else
            return subcategories
    }

}

 