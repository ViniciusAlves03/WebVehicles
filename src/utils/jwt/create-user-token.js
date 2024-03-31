import jwt from "jsonwebtoken";

const createUserToken = async(client, req, res) => {

    const token = jwt.sign({
        name: client.name,
        id: client.id
    }, 'usersecret')

    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        clientId: client.id
    })
}

export default createUserToken
