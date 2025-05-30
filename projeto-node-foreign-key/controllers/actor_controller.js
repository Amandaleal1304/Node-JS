import Actor from "../models/actor.js";
import Film from "../models/film.js";

async function createActor(req, res) {
    const actor = await Actor.create({
        name: req.body.name,
        birthday: req.body.birthday
    });
    res.json(actor);
}

async function listActors(req, res) {
    const list = await Actor.findAll({include: Film});
    res.json(list);
}

async function editActor(req, res) {
    const actor = await Actor.findOne({ where: { id: req.body.id } });
    actor.name = req.body.name;
    actor.birthday = req.body.birthday;
    await actor.save();
    res.json({ mensage: 'Registro alterado' });
}

async function deleteActor(req, res) {
    const actor = await Actor.findOne({ where: { id: req.body.id } });
    await actor.destroy();
    res.json({mensage: 'Registro removido.'});
}

export { createActor, listActors, editActor, deleteActor };