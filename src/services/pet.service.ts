import { PetModel } from '../models/pet.model';
import { generatePet } from '../utils/pet.utils';

export const createPetsMock = async (cant = 50) => {
  try {
    const petsArray = [];

    for (let i = 0; i < cant; i++) {
      const pet = await generatePet();  
      petsArray.push(pet);
    }

    const pets = await PetModel.create(petsArray);

    return pets;
  } catch (error) {
    console.error("Error creating mock pets:", error);
    throw new Error('Failed to create mock pets');
  }
};

export const getPets = async () => {
  try {
    const pets = await PetModel.find({});
    if (!pets || pets.length === 0) {
      throw new Error('No pets found');
    }
    return pets;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw new Error('Failed to fetch pets');
  }
};

export const updatePet = async (id: string, updatedData: { name?: string, type?: string }) => {
  try {
    const updatedPet = await PetModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedPet) {
      throw new Error(`Pet with ID ${id} not found`);
    }
    return updatedPet;
  } catch (error) {
    console.error(`Error updating pet with ID ${id}:`, error);
    throw new Error('Failed to update pet');
  }
};

export const deletePet = async (id: string) => {
  try {
    const deletedPet = await PetModel.findByIdAndDelete(id);
    if (!deletedPet) {
      throw new Error(`Pet with ID ${id} not found`);
    }
    return deletedPet;
  } catch (error) {
    console.error(`Error deleting pet with ID ${id}:`, error);
    throw new Error('Failed to delete pet');
  }
};

