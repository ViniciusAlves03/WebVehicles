import express from "express";
import ClientController from "../controllers/ClientController.js";
import checkToken from '../utils/jwt/verify-token.js'

const clientRoutes = express.Router();

clientRoutes.get("/", ClientController.findAll);
clientRoutes.post("/register", ClientController.register);
clientRoutes.post("/login", ClientController.login);
clientRoutes.get("/:id", ClientController.findClient);
clientRoutes.put("/:id", checkToken, ClientController.updateClient);
clientRoutes.delete("/:id", checkToken, ClientController.deleteClient);

export { clientRoutes as default};
