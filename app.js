import express from 'express';
import film_router from './routers/film_router.js';
import director_router from './routers/director_router.js';
// import sequelize from './database/mysql.js';

// sequelize.authenticate();//verifica conexão

const app = express();
app.use(express.json());

// app.use('/', (req, res)=>{
//     res.end('Rodando!');
// });

app.use('/films', film_router);//tudo vai ser subrota de /films


app.use('/directors', director_router);//tudo vai ser subrota de /directors

app.listen(80, ()=>{
    console.log('Escutando...');//
});
//comentario de teste