// App Imports
import models from '../../setup/models'
import model from '../message/model'
import { product } from '../product/query'
 
 
export async function getAll(parentValue, {}, {auth}) {
    if(auth.user && auth.user.id>0){
  return await models.SavedProduct.findAll({
    where:{
      userId: 1
    },
    include: 
      {
      model: models.Product,
      as: "product",
      include: [
      {
        model: models.TransactionType,
        as : "transactionType"
      },
     {
        model: models.Category,
        as : "categories"
      },
      {
        model: models.User,
        as : "user"
      }] 
   }
  
  })
}else {
  throw new Error('Operation denied.')
}
}


 
export async function addOrRemoveSavedProduct(parentValue, { productId }, {auth}) {


    //check if user has product saved
 return await models.SavedProduct.findOne(
      {
        where: {
          userId: 1,
          productId
        },
       attributes: ["id","userId", "productId"]
      }).then(async (sp)=>{
          console.log(JSON.stringify(sp))
        if(sp!=null){
          console.log("removed")

          return await models.SavedProduct.destroy({
            where: {
              id: sp.id
            }
          })
        }
        else{
          console.log("created")

         return  await models.SavedProduct.create({
            userId: 1,
            productId: productId, 
            include : {
              model: models.product
            }
          }) 
        }
      })
} 


export async function savedprod(parentValue, {  }, {auth}) {
    console.log(auth.user.id)
  if(auth.user && auth.user.id>0){
    return await models.Product.findAll({
      include : {
        model: models.SavedProduct,
        as : "savedProducts",
        attribute: [],
        where: {
          userId: auth.user.id
        }
      }
    })
  }
  else {
    throw new Error('Operation denied.')
}
}
export async function checkProductSaved(parentValue, { productId }, {auth}) {
   
  return await models.SavedProduct.findOne({
    where : {
      userId: 1,
      productId: productId
    }
  })
 
}

