// App Imports
import Demands from '../../modules/pages/Demands'
import Offers from '../../modules/pages/Offers'
import Detail from '../../modules/product/Detail'

import Search from '../../modules/product/Search'
// Product routes
export default {
  product: {
    path: (id = ':id') => (`/product/${ id }`),
    component: Detail
  },
  search: {
    path: (searchstring = ':searchstring', categoryId= ':categoryId',transactionType= ':transactionType') => (`/search/${ searchstring }/${categoryId}/${transactionType}`),
    component: Search
  }

,
offers: {
  path: '/products/offers',
  component: Offers
}
,
demands: {
  path: '/products/demands',
  component: Demands
}
}