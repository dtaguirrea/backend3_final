import { Router } from 'express';
import * as petController from '../controllers/pet.controller';

const router = Router();

// @ts-ignore
router.post("/create", petController.createPets);

// @ts-ignore
router.get("/", petController.getPets);

// @ts-ignore
router.put("/:id", petController.updatePet);

// @ts-ignore
router.delete("/:id", petController.deletePet);

export default router;

