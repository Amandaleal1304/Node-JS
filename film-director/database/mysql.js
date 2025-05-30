import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'projeto_node'
});

sequelize.sync();//cria se nao tiver criado

export default sequelize;