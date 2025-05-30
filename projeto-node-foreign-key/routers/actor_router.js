import { createActor, deleteActor, editActor, listActors } from "../controllers/actor_controller.js";
import { Router } from "express";

const actor_router = Router();
actor_router.get('/', listActors);
actor_router.post('/', createActor);
actor_router.put('/', editActor);
actor_router.delete('/', deleteActor);

export default actor_router;