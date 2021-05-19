// App Imports
import params from '../../../setup/config/params'
import CategoryList from '../../../modules/admin/category/List'
import CategoryCreateOrEdit from '../../../modules/admin/category/CreateOrEdit'


// Admin category routes
export const categoryList = {
    path: '/admin/categories',
    component: CategoryList,
    auth: true,
    role: params.user.roles.admin
}

export const categoryCreate = {
    path: '/admin/category/create',
    component: CategoryCreateOrEdit,
    auth: true,
    role: params.user.roles.admin
}

export const categoryEdit = {
    path: (id = ':id') => (`/admin/category/${ id }/edit`),
    component: CategoryCreateOrEdit,
    auth: true,
    role: params.user.roles.admin
}
