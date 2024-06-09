import Store from '../models/Store.js';
import bcrypt from 'bcrypt';
import createUserToken from "../utils/jwt/create-user-token.js";
import getToken from "../utils/jwt/get-token.js";
import getStoreByToken from '../utils/jwt/get-store-by-token.js';
import Vehicle from '../models/Vehicle.js';

class StoreController {

    async register(req, res) {

        const { name, email, cnpj, password, phone, street, number, neighborhood, city, state } = req.body

        if (!name) { return sendError(res, "o nome é obrigatório!") }
        if (!phone) { return sendError(res, "o número de telefone é obrigatório!") }
        if (!cnpj) { return sendError(res, "o cnpj é obrigatório!") }
        if (!password) { return sendError(res, "a senha é obrigatória!") }
        if (!email) { return sendError(res, "o e-mail é obrigatório!") }
        if (!street) { return sendError(res, "a rua é obrigatória!") }
        if (!number) { return sendError(res, "o número é obrigatório!") }
        if (!neighborhood) { return sendError(res, "o bairro é obrigatório!") }
        if (!city) { return sendError(res, "a cidade é obrigatória!") }
        if (!state) { return sendError(res, "o estado é obrigatório!") }

        const store = await Store.findByEmail(email);
        const storeCnpj = await Store.findOne({ where: { cnpj: cnpj } });

        if (store) {
            return res.status(401).json({ error: 'E-mail já cadastrado!' });
        }

        if (storeCnpj) {
            return res.status(401).json({ error: 'CNPJ já cadastrado!' });
        }

        try {
            const passwordHash = await hashPassword(password)
            const newStore = await Store.create({ name, email, cnpj, password: passwordHash, phone, street, number, neighborhood, city, state });

            res.status(201).json(newStore)
        } catch (error) {
            console.error('Erro ao registrar loja:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async login(req, res) {

        const { email, password } = req.body

        if (!email) { return sendError(res, "o e-mail é obrigatório!") }
        if (!password) { return sendError(res, "a senha é obrigatória!") }

        const store = await Store.findByEmail(email);

        if (!store) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const checkPassword = await comparePassword(password, store.password)

        if (!checkPassword) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        await createUserToken(store, req, res)
    }

    async findAll(req, res) {
        Store.findAll().then((result) => res.json(result));
    }

    async findStore(req, res) {
        try {

            const store = await Store.findOne({ where: { id: req.params.id } });
            if (!store) {
                return sendError(res, "Loja não encontrada!");
            }

            res.status(200).json({ store });
        } catch (error) {
            console.error('Erro ao buscar loja:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async updateStore(req, res) {

        const token = getToken(req)
        const store = await getStoreByToken(token)

        const { name, password, phone, street, number, neighborhood, city, state } = req.body

        if (store.id !== parseInt(req.params.id)) {
            return sendError(res, "Você não tem permissão para modificar esta loja.");
        }

        if (!name) { return sendError(res, "o nome é obrigatório!") }
        if (!phone) { return sendError(res, "o número de telefone é obrigatório!") }
        if (!password) { return sendError(res, "a senha é obrigatória!") }
        if (!street) { return sendError(res, "a rua é obrigatória!") }
        if (!number) { return sendError(res, "o número é obrigatório!") }
        if (!neighborhood) { return sendError(res, "o bairro é obrigatório!") }
        if (!city) { return sendError(res, "a cidade é obrigatória!") }
        if (!state) { return sendError(res, "o estado é obrigatória!") }

        const image1 = req.file.filename

        await Store.update(
            {
                name: name,
                phone: phone,
                password: password,
                street: street,
                number: number,
                neighborhood: neighborhood,
                city: city,
                state: state,
                image1: image1
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        Store.findByPk(req.params.id).then((result) => res.json(result));
    }

    async deleteStore(req, res) {

        const token = getToken(req)
        const store = await getStoreByToken(token)

        if (store.id !== parseInt(req.params.id)) {
            return sendError(res, "Você não tem permissão para deletar esta loja.");
        }

        await Store.destroy({
            where: {
                id: req.params.id,
            },
        });

        await Vehicle.destroy({
            where: {
                storeId: req.params.id,
            },
        })

        Store.findAll().then((result) => res.json(result));
    }
}

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

export default new StoreController();
