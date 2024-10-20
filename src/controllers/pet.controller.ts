import { Request, Response, NextFunction } from 'express';
import * as petService from "../services/pet.service";

export const createPets = async (req: Request, res: Response, next: NextFunction) => {
  const { cant = 0 } = req.query;
  try {
    const response = await petService.createPetsMock(Number(cant));
    res.status(201).json({
      message: `${cant} pets created successfully`,
      pets: response,
    });
  } catch (error) {
    console.error("Error creating pets:", error);
    res.status(500).json({
      message: "Failed to create pets",
      error: (error as Error).message,
    });
  }
};

export const getPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await petService.getPets();
    if (response.length === 0) {
      return res.status(404).json({ message: "No pets found" });
    }
    res.status(200).json({ pets: response });
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({
      message: "Failed to retrieve pets",
      error: (error as Error).message, 
    });
  }
};

export const updatePet = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, type } = req.body;
  try {
    const updatedPet = await petService.updatePet(id, { name, type });
    res.status(200).json({
      message: `Pet with ID ${id} updated successfully`,
      pet: updatedPet,
    });
  } catch (error) {
    console.error("Error updating pet:", error);
    res.status(500).json({
      message: "Failed to update pet",
      error: (error as Error).message,
    });
  }
};

export const deletePet = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedPet = await petService.deletePet(id);
    res.status(200).json({
      message: `Pet with ID ${id} deleted successfully`,
      pet: deletedPet,
    });
  } catch (error) {
    console.error("Error deleting pet:", error);
    res.status(500).json({
      message: "Failed to delete pet",
      error: (error as Error).message,
    });
  }
};

