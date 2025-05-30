import Director from "../models/director.js";
import Film from "../models/film.js";
import Actor from "../models/actor.js";

async function createFilm(req, res) {
    const actors = [];//vetor de id de atores
    for(let i = 0; i < req.body.actors.length; i++){
       const actor = await Actor.findByPk( req.body.actors[i]);//busca pelo id
       actors.push(actor);//adiciona ao vetor
        
    }
    const film = await Film.create({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        DirectorId: req.body.DirectorId
    });
    await film.addActors(actors);//adiciona os atores
    res.json(film);
}

async function listFilms(req, res) {
    const list = await Film.findAll({include:[Actor, Director]});
    res.json(list);
}

async function editFilm(req, res) {
    const film = await Film.findOne({ where: { id: req.body.id } });
    film.title = req.body.title;
    film.description = req.body.description;
    film.year = req.body.year;
    await film.save();
    res.json({ mensage: 'Registro alterado' });
}

async function deleteFilm(req, res) {
    const film = await Film.findOne({ where: { id: req.body.id } });
    await film.destroy();
    res.json({ mensage: 'Registro removido.' });
}

export { createFilm, listFilms, editFilm, deleteFilm };