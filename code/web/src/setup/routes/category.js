//Author: Zakaria
import List from '../../modules/category/List'
import Detail from '../../modules/category/Detail'
// Category routes
export default {
    listCat: {
        path: '/categories',
        component: List,
    },
    detailsCat: {
        path: (id = ':id') => (`/category/${ id }`),
        component: Detail,
    }
}