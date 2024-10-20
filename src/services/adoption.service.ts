import { AdoptionModel } from '../models/adoption.model';
import { UserModel } from '../models/user.model';
import { PetModel } from '../models/pet.model';
import mongoose, { ObjectId } from 'mongoose';

export const createAdoption = async (userId: string, petId: string) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const petObjectId = new mongoose.Types.ObjectId(petId);

    const user = await UserModel.findById(userObjectId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const pet = await PetModel.findById(petObjectId);
    if (!pet) {
      throw new Error(`Pet with ID ${petId} not found`);
    }
    if (pet.owner) {
      throw new Error(`Pet with ID ${petId} is already adopted`);
    }

    const adoption = new AdoptionModel({ user: userObjectId, pet: petObjectId });
    await adoption.save();

    pet.owner = userObjectId;
    await pet.save();

    user.adoptedPets.push(petObjectId);
    await user.save();

    return adoption;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating adoption:', error.message);
      throw new Error(error.message);
    }
    throw error;  
  }
};

export const getAllAdoptions = async () => {
  try {
    return await AdoptionModel.find().populate('user pet');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching adoptions:', error.message);
      throw new Error('Failed to fetch adoptions');
    }
    throw error;
  }
};

export const getAdoptionById = async (id: string) => {
  try {
    const adoptionObjectId = new mongoose.Types.ObjectId(id);
    const adoption = await AdoptionModel.findById(adoptionObjectId).populate('user pet');
    if (!adoption) {
      throw new Error(`Adoption with ID ${id} not found`);
    }
    return adoption;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching adoption with ID ${id}:`, error.message);
      throw new Error('Failed to fetch adoption');
    }
    throw error;
  }
};

