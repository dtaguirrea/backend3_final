import { Request, Response, NextFunction } from 'express';
import * as adoptionService from '../services/adoption.service';

export const createAdoption = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, petId } = req.body;
  try {
    const adoption = await adoptionService.createAdoption(userId, petId);
    res.status(201).json({
      message: 'Adoption created successfully',
      adoption,
    });
  } catch (error) {
    console.error('Error creating adoption:', error);
    res.status(500).json({
      message: 'Failed to create adoption',
      error: (error as Error).message,
    });
  }
};

export const getAllAdoptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adoptions = await adoptionService.getAllAdoptions();
    res.status(200).json({ adoptions });
  } catch (error) {
    console.error('Error fetching adoptions:', error);
    res.status(500).json({
      message: 'Failed to fetch adoptions',
      error: (error as Error).message,
    });
  }
};

export const getAdoptionById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const adoption = await adoptionService.getAdoptionById(id);
    res.status(200).json({ adoption });
  } catch (error) {
    console.error(`Error fetching adoption with ID ${id}:`, error);
    res.status(500).json({
      message: 'Failed to fetch adoption',
      error: (error as Error).message,
    });
  }
};
