import express from "express";
import db from "./src/db.js";
import routes from "./src/routes/ClientRoutes.js";

const app = express();

app.use(express.json());
//app.use('/user', UserRoutes);
app.use('/client', routes)

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
