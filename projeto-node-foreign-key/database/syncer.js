import sequelize from "./mysql.js";
import Film from "../models/film.js";
import Director from "../models/director.js";
import Actor from "../models/actor.js";
//teste git
async function syncer(){
    try{
    await sequelize.authenticate();
    Film.sync();
    Film.belongsTo(Director);//cria a chave estrangeira
    Director.hasMany(Film);//cria a chave estrangeira
    Film.belongsToMany(Actor, {through: 'Film_Actor'});//cria a tabela de associacao
    Actor.belongsToMany(Film, {through: 'Film_Actor'});//cria a tabela de associacao
    await sequelize.sync();
    }
    catch(error){
        console.log('Erro ao acessar a base de dados.');
        console.log(error);
        return false;
    }
    return true;

}
export default syncer;