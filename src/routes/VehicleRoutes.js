import express from "express";
import VehicleController from "../controllers/VehicleController.js";

const vehicleRoutes = express.Router();

vehicleRoutes.post("/:type/store/:id", VehicleController.registerVehicle);
vehicleRoutes.get("/category/:type", VehicleController.getAllVehicles);
vehicleRoutes.get("/search/:name", VehicleController.getVehicleByName);
vehicleRoutes.get("/:id", VehicleController.getVehicleById);
vehicleRoutes.get("/store/:id", VehicleController.getAllStoreVehicles);
vehicleRoutes.put("/:id/store/:store", VehicleController.updateVehicle);
vehicleRoutes.delete("/:id/store/:store", VehicleController.deleteVehicle);

export { vehicleRoutes as default};
