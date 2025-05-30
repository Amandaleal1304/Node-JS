import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

// id e datas de criacao e alteracao sao automaticas
const Film = sequelize.define("Director", {
 name: DataTypes.STRING,
 age: DataTypes.INTEGER,
 telephone: DataTypes.STRING,
});

export default Film;