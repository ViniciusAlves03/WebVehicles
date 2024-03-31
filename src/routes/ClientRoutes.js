import express from "express";
import ClientController from "../controllers/ClientController.js";

const routes = express.Router();

routes.get("/", ClientController.findAll);
routes.post("/register", ClientController.register);
routes.post("/login", ClientController.login);
routes.get("/:id", ClientController.findClient);
routes.put("/:id", ClientController.updateClient);
routes.delete("/:id", ClientController.deleteClient);

export { routes as default };
