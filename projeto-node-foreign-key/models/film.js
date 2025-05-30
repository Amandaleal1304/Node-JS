import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Film = sequelize.define('Film', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    year: DataTypes.INTEGER
});

export default Film;