
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

    const list = await Film.findAll({ include: [Gender, Director]});
    //o raw true e pra filtrar o data values
    //nest so muda a estrutura ou seja cria o objeto diretor
    const list_processed = list.map((film =>{return film.toJSON();}) );
    console.log(list_processed);//teste de o que ta sendo passado
    const directors = await Director.findAll({raw: true});//pega a lista de directors e passa para a interface
    const genders = await Gender.findAll({raw: true});//pega a lista de genders e passa para a interface

    res.render('films/films', { films: list_processed, directors: directors, genders: genders });//app.js a router e /nome do arquivo handlebars

}


//1º fase - exibição do formulário preenchido
async function editFilm(req, res) { 

    const film = await Film.findOne({ where: { id: req.body.id } });
    const film_editing = film.toJSON();
    console.log(film_editing);
    const directors = await Director.findAll({raw: true});//pega a lista de directors e passa para a interface
    const genders = await Gender.findAll({raw: true});//pega a lista de genders e passa para a interface
    film.genders = film.Genders.map((ac) => {
        return ac.id;
    });//vai percorrer o vetor e pegar os generos marcados por comparação
    console.log(film);
    res.render('films/films', {
         action: 'edit',
          film_editing: film.dataValues,
          directors: directors,
          genders: genders
        });///films é o nome da minha pasta na view

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

