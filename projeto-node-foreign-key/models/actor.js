import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Actor = sequelize.define('Actor', {
    name: DataTypes.STRING,
    birthday: DataTypes.DATEONLY    
});

export default Actor;