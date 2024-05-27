import jwt from 'jsonwebtoken'
import Store from '../../models/Store.js'

const getStoreByToken = async (token) => {

    if(!token){
        return res.status(401).json({message: "Acesso negado!"})
    }

    const decoded = jwt.verify(token, 'usersecret')

    const storeId = decoded.id

    const store = await Store.findByPk(storeId)

    return store
}

export default getStoreByToken
