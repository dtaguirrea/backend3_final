import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';


export const generateUser = async () => {
  
  const hashedPassword = await bcrypt.hash('coder123', 1);

  const roles = ['user', 'admin'];
  const randomRole = roles[Math.floor(Math.random() * roles.length)];

  return {
    name: faker.person.fullName(), 
    email: faker.internet.email(), 
    password: hashedPassword,  
    role: randomRole,  
    pets: [],  
  };
};
