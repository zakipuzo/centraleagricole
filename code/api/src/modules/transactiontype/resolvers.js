// App Imports
import models from '../../setup/models'

 
// Get all productcategoriess
export async function getAll() {
    return await models.TransactionType.findAll()
}
