import jwt from 'jsonwebtoken'
import Client from '../../models/Client.js'

const getUserByToken = async (token) => {

    if(!token){
        return res.status(401).json({message: "Acesso negado!"})
    }

    const decoded = jwt.verify(token, 'usersecret')

    const clientId = decoded.id

    const client = await Client.findByPk(clientId)

    return client
}

export default getUserByToken
