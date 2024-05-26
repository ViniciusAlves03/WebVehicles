import Client from "../models/Client.js";
import bcrypt from 'bcrypt';
import createUserToken from "../utils/jwt/create-user-token.js";
import getToken from "../utils/jwt/get-token.js";
import getUserByToken from '../utils/jwt/get-user-by-token.js'

class ClientController {

  async register(req, res) {

    const { name, email, cpf, password, phone } = req.body

    if (!name) { return sendError(res, "o nome é obrigatório!") }
    if (!phone) { return sendError(res, "o número de telefone é obrigatório!") }
    if (!cpf) { return sendError(res, "o cpf é obrigatório!") }
    if (!password) { return sendError(res, "a senha é obrigatória!") }
    if (!email) { return sendError(res, "o e-mail é obrigatório!") }

    const client = await Client.findByEmail(email);
    if (client) {
      return res.status(401).json({ error: 'E-mail já cadastrado!' });
    }

    try {
      const passwordHash = await hashPassword(password)
      const newClient = await Client.create({ name, email, cpf, password: passwordHash, phone });

      res.status(201).json(newClient)
    } catch (error) {
      console.error('Erro ao registrar cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async login(req, res) {

    const { email, password } = req.body

    if (!email) { return sendError(res, "o e-mail é obrigatório!") }
    if (!password) { return sendError(res, "a senha é obrigatória!") }

    const client = await Client.findByEmail(email);

    if (!client) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const checkPassword = await comparePassword(password, client.password)

    if (!checkPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    await createUserToken(client, req, res)
  }

  async findAll(req, res) {
    Client.findAll().then((result) => res.json(result));
  }

  async findClient(req, res) {
    try {
      getToken(req);

      const client = await Client.findByPk(req.params.id);
      if (!client) {
        return sendError(res, "Usuário não cadastrado!");
      }

      res.status(200).json({ client });
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async updateClient(req, res) {

    const token = getToken(req)
    const client = await getUserByToken(token)

    const { name, password, phone } = req.body

    if (!name) { return sendError(res, "o nome é obrigatório!") }
    if (!phone) { return sendError(res, "o número de telefone é obrigatório!") }
    if (!password) { return sendError(res, "a senha é obrigatória!") }

    if (client.id !== parseInt(req.params.id)) {
      return sendError(res, "Você não tem permissão para modificar este cliente.");
    }

    await Client.update(
      {
        name: name,
        phone: phone,
        password: password
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    Client.findByPk(req.params.id).then((result) => res.json(result));
  }

  async deleteClient(req, res) {

    const token = getToken(req)
    const client = await getUserByToken(token)

    if (client.id !== parseInt(req.params.id)) {
      return sendError(res, "Você não tem permissão para modificar este cliente.");
    }

    await Client.destroy({
      where: {
        id: req.params.id,
      },
    });

    Client.findAll().then((result) => res.json(result));
  }
};

async function sendError(res, message) {
  res.status(422).json({ message })
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12)
  return await bcrypt.hash(password, salt)
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

export default new ClientController();
