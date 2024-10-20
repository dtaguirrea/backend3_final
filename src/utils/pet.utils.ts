import { faker } from '@faker-js/faker';

export const generatePet = () => {
  const types = ['dog', 'cat', 'bird'] as const; 
  const randomType = types[Math.floor(Math.random() * types.length)];

  const fakerAnimalMap: Record<typeof types[number], () => string> = {
    dog: faker.animal.dog,
    cat: faker.animal.cat,
    bird: faker.animal.bird,
  };

  return {
    name: fakerAnimalMap[randomType](), 
    type: randomType,
  };
};
