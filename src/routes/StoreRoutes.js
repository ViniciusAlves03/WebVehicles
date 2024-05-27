import express from "express";
import StoreController from "../controllers/StoreController.js";
import checkToken from '../utils/jwt/verify-token.js'

const storeRoutes = express.Router();

storeRoutes.get("/", StoreController.findAll);
storeRoutes.post("/register", StoreController.register);
storeRoutes.post("/login", StoreController.login);
storeRoutes.get("/:name", StoreController.findStore);
storeRoutes.put("/:id", checkToken, StoreController.updateStore);
storeRoutes.delete("/:id", checkToken, StoreController.deleteStore);

export { storeRoutes as default};
