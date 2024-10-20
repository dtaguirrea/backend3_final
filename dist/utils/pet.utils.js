"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePet = void 0;
const faker_1 = require("@faker-js/faker");
const generatePet = () => {
    const types = ['dog', 'cat', 'bird'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const fakerAnimalMap = {
        dog: faker_1.faker.animal.dog,
        cat: faker_1.faker.animal.cat,
        bird: faker_1.faker.animal.bird,
    };
    return {
        name: fakerAnimalMap[randomType](),
        type: randomType,
    };
};
exports.generatePet = generatePet;
