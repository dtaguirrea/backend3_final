import { Router } from 'express';
import * as adoptionController from '../controllers/adoption.controller';

const router = Router();

// @ts-ignore
router.post('/create', adoptionController.createAdoption);

// @ts-ignore
router.get('/', adoptionController.getAllAdoptions);

// @ts-ignore
router.get('/:id', adoptionController.getAdoptionById);

export default router;
