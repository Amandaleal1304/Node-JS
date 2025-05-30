import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    database: 'pratica_node'
});

// Make sync middlware 
sequelize.sync();

export default sequelize;