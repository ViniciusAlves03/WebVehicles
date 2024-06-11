import express from "express";
import StoreController from "../controllers/StoreController.js";
import imageUpload from "../utils/image-upload.js";
import checkToken from '../utils/jwt/verify-token.js'

const storeRoutes = express.Router();

storeRoutes.get("/", imageUpload.single('images'), StoreController.findAll);
storeRoutes.post("/register", StoreController.register);
storeRoutes.post("/login", StoreController.login);
storeRoutes.get("/:id", StoreController.findStore);
storeRoutes.put("/:id", checkToken, imageUpload.single('images'), StoreController.updateStore);
storeRoutes.delete("/:id", StoreController.deleteStore);

export { storeRoutes as default};
