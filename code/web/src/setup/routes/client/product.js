// App Imports
import params from '../../config/params.json'
import ProductList from '../../../modules/client/product/List'
import ProductCreateOrEdit from '../../../modules/client/product/CreateOrEdit'
import ClientShop from '../../../modules/client/product/ClientShop'

// Admin product routes
export const clientProductList = {
  path: '/client/products',
  component: ProductList,
  auth: true,
}

export const clientProductCreate = {
  path: '/client/product/create',
  component: ProductCreateOrEdit,
  auth: true,
  role: params.user.roles.user
}

export const clientProductEdit = {
  path: (id = ':id') => (`/client/product/${ id }/edit`),
  component: ProductCreateOrEdit,
  auth: true,
  role: params.user.roles.user
  
}

// Client products Shop
export const clientShop = {
  path: (id = ':id') => (`/client/shop/${ id }`),
  component: ClientShop,  
}