
import Gender from "../../models/gender.js";

import Director from "../../models/director.js";

import Film from "../../models/film.js";



async function createFilm(req, res) {

    const genders = [];

    for (let i = 0; i < req.body.genders.length; i++) {

        const gender= await Gender.findByPk(req.body.genders[i]);

        genders.push(gender);

    }

    const film = await Film.create({

        title: req.body.title,

        description: req.body.description,

        year: req.body.year,

        DirectorId: req.body.DirectorId

    });

    await film.addGenders(genders);

    res.render('alerts', { title: 'Films', body: 'Film created.' });

}



async function listFilms(req, res) {

    const list = await Film.findAll({ include: [Gender, Director], raw: true });
    console.log(list);//ver como ta saindo a informacao de diretor e genero

    res.render('films/films', { films: list });

}


//1º fase - exibição do formulário preenchido
async function editFilm(req, res) { 

    const film = await Film.findOne({ where: { id: req.body.id } });

    res.render('films/films', { action: 'edit', film_editing: film.dataValues });

}


//2º fase - processamento - alterar as propriedades e salvar
async function saveFilm(req, res) { 

    const film = await Film.findOne({ where: { id: req.body.id } });

    film.title = req.body.title;

    film.description = req.body.description;

    film.year = req.body.year;

    film.DirectorId = req.body.DirectorId;

    await film.save();

    res.render('alerts', { title: 'Films', body: 'Film edited.' });

}



async function deleteFilm(req, res) {

    const film = await Film.findOne({ where: { id: req.body.id } });

    await film.destroy();

    res.render('alerts', { title: 'Films', body: 'Film deleted.' });

}



export { createFilm, listFilms, editFilm, saveFilm, deleteFilm };

