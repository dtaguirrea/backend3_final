import { UserModel } from '../models/user.model';
import { PetModel } from '../models/pet.model';
import { AdoptionModel } from '../models/adoption.model';
import { generateUser } from '../utils/user.utils';
import { generatePet } from '../utils/pet.utils';

export const generateMockUsers = async (cant = 50) => {
    try {
      const usersArray = [];
  
      for (let i = 0; i < cant; i++) {
        const user = await generateUser(); 
        usersArray.push(user);
      }
  
      const users = await UserModel.create(usersArray);
  
      return users;
    } catch (error) {
      console.error("Error creating mock users:", error);
      throw new Error('Failed to create mock users');
    }
  };

  export const generateMockPets = async (cant = 50) => {
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

  export const generateData = async (userCount = 0, petCount = 0) => {
    try {
      const usersArray = await generateMockUsers(userCount);
  
      const petsArray = await generateMockPets(petCount)

  
      return { usersArray, petsArray };
    } catch (error) {
      console.error("Error creating mock data:", error);
      throw new Error('Failed to create mock data');
    }
  };

  export const generateMockAdoptions = async (count: number) => {
    const users = await UserModel.find();
    const pets = await PetModel.find({ owner: null }); 
  
    if (users.length === 0 || pets.length === 0) {
      throw new Error('No users or pets available to create mock adoptions');
    }
  
    const adoptions = [];
    for (let i = 0; i < count; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPet = pets[Math.floor(Math.random() * pets.length)];
  
      const adoption = new AdoptionModel({
        user: randomUser._id,
        pet: randomPet._id,
        adoptionDate: new Date(),
      });
  
      await adoption.save();
  
      randomPet.owner = randomUser._id;
      await randomPet.save();
  
      randomUser.adoptedPets.push(randomPet._id);
      await randomUser.save();
  
      adoptions.push(adoption);
    }
  
    return adoptions;
  };