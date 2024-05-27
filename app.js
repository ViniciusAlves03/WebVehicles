import express from "express";
import db from "./src/db.js";
import clientRoutes from "./src/routes/ClientRoutes.js";
import storeRoutes from "./src/routes/StoreRoutes.js";
import vehicleRoutes from "./src/routes/VehicleRoutes.js";

const app = express();

app.use(express.json());

app.use('/client', clientRoutes)
app.use('/store', storeRoutes)
app.use('/vehicle', vehicleRoutes)

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
