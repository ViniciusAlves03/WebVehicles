import express from "express";
import VehicleController from "../controllers/VehicleController.js";
import imageUpload from "../utils/image-upload.js";
import checkToken from '../utils/jwt/verify-token.js'

const vehicleRoutes = express.Router();

vehicleRoutes.post("/:type/store/:id", checkToken, imageUpload.array('images', 3), VehicleController.registerVehicle);
vehicleRoutes.get("/category/:type", VehicleController.getAllVehicles);
vehicleRoutes.get("/search/:name", VehicleController.getVehicleByName);
vehicleRoutes.get("/:id", VehicleController.getVehicleById);
vehicleRoutes.get("/store/:id", checkToken, VehicleController.getAllStoreVehicles);
vehicleRoutes.put("/:id/store/:store", checkToken, imageUpload.array('images', 3), VehicleController.updateVehicle);
vehicleRoutes.delete("/:id/store/:store", checkToken, VehicleController.deleteVehicle);

export { vehicleRoutes as default};
