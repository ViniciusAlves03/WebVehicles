import { Sequelize } from "sequelize";
import db from "../db.js";

const Vehicle = db.define("vehicle", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  engine: {
    type: Sequelize.STRING,
  },
  plate: {
    type: Sequelize.STRING,
  },
  chassis: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  km: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brakes: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  transmission: {
    type: Sequelize.STRING,
  },
  numSeats: {
    type: Sequelize.INTEGER,
  },
  numDoors: {
    type: Sequelize.INTEGER,
  },
  startingSystem: {
    type: Sequelize.STRING,
  },
  cargoCapacity: {
    type: Sequelize.INTEGER,
  },
  numAxles: {
    type: Sequelize.INTEGER,
  },
  storeId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

export default Vehicle;
