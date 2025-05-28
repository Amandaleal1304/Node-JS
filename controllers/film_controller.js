import Film from "../models/film.js";

async function createFilm(req,  res){ //req é a requisicao que chega 
    const film = await Film.create({
        title: req.body.title,
         description: req.body.description,
         year: req.body.year,
    });

    res.json(film);
}

async function listFilms(req, res){
    const list = await Film.findAll();//lista completa
    res.json(list);
}

async function editFilm(req, res){
    const film = await Film.findOne({where: {id: req.body.id}});//busca pelo id
    film.title = req.body.title;//atualiza os dados
    film.description = req.body.description;
    film.year = req.body.year;
    if(await film.save()){//salva os dados e da uma resposta
        res.json({mensage: 'Filme alterado!'});
    }
    else {
        res.json({mensage: 'Erro ao alterar!'});
    }
    res.json(film);

}

async function deleteFilm(req, res){
    const film = await Film.findOne({where: {id: req.body.id}});//busca pelo id
    if(await film.destroy()){//deleta e da uma resposta
        res.json({mensage: 'Filme removido!'});
    }
    else {
        res.json({mensage: 'Erro ao remover!'});
    }
}
export {createFilm, listFilms, editFilm, deleteFilm};