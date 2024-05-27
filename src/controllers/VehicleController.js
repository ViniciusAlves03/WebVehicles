import Vehicle from '../models/Vehicle.js';
import getToken from '../utils/jwt/get-token.js';
import getStoreByToken from '../utils/jwt/get-store-by-token.js';
import { Op } from 'sequelize';

class VehicleController {

    async registerVehicle(req, res) {

        const token = getToken(req);
        const store = await getStoreByToken(token);

        if (store.id !== parseInt(req.params.id)) {
            return sendError(res, "Você não tem permissão para criar veículos.");
        }

        const { name, engine, plate, chassis, color, brand, year, km, brakes, price, transmission, numSeats, numDoors, startingSystem, cargoCapacity, numAxles } = req.body

        if (!name) { return sendError(res, "o nome é obrigatório!") }
        if (!chassis) { return sendError(res, "o chassi é obrigatório!") }
        if (!color) { return sendError(res, "a cor é obrigatória!") }
        if (!brand) { return sendError(res, "a marca é obrigatória!") }
        if (!year) { return sendError(res, "o ano é obrigatório!") }
        if (!km) { return sendError(res, "a km é obrigatório!") }
        if (!price) { return sendError(res, "o preço é obrigatório!") }

        if (store.id !== parseInt(req.params.id)) {
            return sendError(res, "Você não tem permissão para modificar esta loja.");
        }

        const type  = req.params.type
        const vehicleChassis = await Vehicle.findOne({ where: { chassis: chassis } });
        const status = 'available'

        if (vehicleChassis) {
            return res.status(401).json({ error: 'Chassi já cadastrado!' });
        }

        try {
            const newVehicle = await Vehicle.create({ name, type: type, engine, plate, chassis, color, brand, year, status, km, brakes, price, transmission, numSeats, numDoors, startingSystem, cargoCapacity, numAxles, storeId: store.id });

            res.status(201).json(newVehicle)
        } catch (error) {
            console.error('Erro ao registrar loja:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async getAllVehicles(req, res) {

        const type  = req.params.type
        const vehicles = await Vehicle.findAll({where: { type: type }});

        res.status(200).json({ vehicles })
    }

    async getVehicleByName(req, res) {

        const name  = req.params.name

        const vehicles = await Vehicle.findAll({ where: { name: {[Op.like]: `%${name}%`} } });

        res.status(200).json({ vehicles })
    }

    async getVehicleById(req, res) {

        const id  = req.params.id
        const vehicle = await Vehicle.findByPk(id);

        res.status(200).json({ vehicle })
    }

    async getAllStoreVehicles(req, res) {

        const token = getToken(req);
        const store = await getStoreByToken(token);

        if (store.id !== parseInt(req.params.id)) {
            return sendError(res, "Você não tem permissão para acessar estes veículos.");
        }

        const vehicles = await Vehicle.findAll({where: { storeId: store.id }});

        res.status(200).json({ vehicles })
    }

    async updateVehicle(req, res){

        const token = getToken(req);
        const store = await getStoreByToken(token);

        if (store.id !== parseInt(req.params.store)) {
            return sendError(res, "Você não tem permissão para modificar este veículo.");
        }

        const vehicle = await Vehicle.findOne({where: { id: req.params.id, storeId: store.id }});

        if (!vehicle){
            return sendError(res, "Veículo não encontrado!")
        }

        const { name, engine, plate, color, brand, year, km, brakes, price, transmission, numSeats, numDoors, startingSystem, cargoCapacity, numAxles } = req.body

        if (!name) { return sendError(res, "o nome é obrigatório!") }
        if (!color) { return sendError(res, "a cor é obrigatória!") }
        if (!brand) { return sendError(res, "a marca é obrigatória!") }
        if (!year) { return sendError(res, "o ano é obrigatório!") }
        if (!km) { return sendError(res, "a km é obrigatório!") }
        if (!price) { return sendError(res, "o preço é obrigatório!") }

        await Vehicle.update(
            {
                name: name,
                engine: engine,
                plate: plate,
                brand: brand,
                color: color,
                year: year,
                km: km,
                brakes: brakes,
                price: price,
                transmission: transmission,
                numSeats: numSeats,
                numDoors: numDoors,
                startingSystem: startingSystem,
                cargoCapacity: cargoCapacity,
                numAxles: numAxles
            },
            {
                where: {
                    id: req.params.id,
                    storeId: req.params.store
                },
            }
        );

        Vehicle.findByPk(req.params.id).then((result) => res.json(result));

    }

    async deleteVehicle(req, res){

        const token = getToken(req);
        const store = await getStoreByToken(token);

        if (store.id !== parseInt(req.params.store)) {
            return sendError(res, "Você não tem permissão para deletar este veículo.");
        }

        const vehicle = await Vehicle.findOne({where: { id: req.params.id, storeId: store.id }});

        if (!vehicle){
            return sendError(res, "Veículo não encontrado!")
        }

        await Vehicle.destroy({
            where: {
                id: req.params.id,
                storeId: req.params.store
            },
        })

        res.status(200).json({ message: "Veículo excluído!" })
    }
}

async function sendError(res, message) {
    res.status(422).json({ message })
}

export default new VehicleController();
