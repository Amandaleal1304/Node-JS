import express from 'express';

import film_router from './routers/film_router.js';
import actor_router from './routers/actor_router.js';
import director_router from './routers/director_router.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.end('Rodando');
});
app.use('/films', film_router);
app.use('/actors', actor_router);
app.use('/directors', director_router);

app.listen(80, () => {
    console.log('Escutando...');
});