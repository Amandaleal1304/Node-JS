import Director from "../models/director.js";
import Film from "../models/film.js";

async function createDirector(req, res) {
    const director = await Director.create({
        name: req.body.name,
        country: req.body.country
    });
    res.json(director);
}

async function listDirectors(req, res) {
    const list = await Director.findAll({include: Film});
    res.json(list);
}

async function editDirector(req, res) {
    const director = await Director.findOne({ where: { id: req.body.id } });
    director.name = req.body.name;
    director.country = req.body.country;
    await director.save();
    res.json({ mensage: 'Registro alterado' });
}

async function deleteDirector(req, res) {
    const director = await Director.findOne({ where: { id: req.body.id } });
    await director.destroy();
    res.json({mensage: 'Registro removido.'});
}

export { createDirector, listDirectors, editDirector, deleteDirector };