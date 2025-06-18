import express from 'express';
import {create} from 'express-handlebars';
// import film_router from './routers/film_router.js';
import film_web_router from './routers/web/film_router.js';
import director_web_router from './routers/web/director_router.js';
import gender_web_router from './routers/web/gender_routers.js';
import syncer from './database/syncer.js';
// import sequelize from './database/mysql.js';

if(!await syncer()){
    process.exit();//se nao conseguir sincronizar, sai
}
// sequelize.authenticate();//verifica conexão

const app = express();

const hbs = create({

    extname: '.handlebars',//extensao
    defaultLayout: 'main',//layout padrao
    layoutsDir: 'views/layouts/',//pasta dos layouts
    partialsDir: 'views/partials/'//pasta dos parciais
});

hbs.handlebars.registerHelper('eq', (a, b) => {
    return a == b;
});//criar um helper que recebe dois valores e compara se sao iguais usa na view na parte de diretor

hbs.handlebars.registerHelper('contains', (a, b) => {
    return typeof a != 'undefined' && a.indexOf(b) != -1;//procura no vetor o valor e retorna o indice se nao encontrar retorna -1
});//se for diferente de -1 é porque existe ou seja marca o genero como pertence ao filme

app.use(express.json());
app.use(express.urlencoded());//interpreta os dados do formulario padrao de navegador
app.engine('handlebars', hbs.engine);//usar o handlebars

app.set('view engine', 'handlebars');//a instancia padrao de visualização

app.set('views', './views');//pasta das views

// app.use('/', (req, res)=>{
//     res.end('Rodando!');
// });
app.get('/', (req, res) => {

    res.render('home');//renderiza a home

});

app.use('/films', film_web_router);//tudo vai ser subrota de /films


app.use('/directors', director_web_router);//tudo vai ser subrota de /directors

app.use('/genders', gender_web_router);//tudo vai ser subrota de /genders

app.use(express.static('public'));//arquivos estaticos para usar o css tem que liberar a pasta 

app.listen(80, ()=>{
    console.log('Escutando...');
});
