import { describe, test, before } from "node:test";
import assert from "node:assert";
import { generateMockUsers, generateMockPets, generateMockAdoptions, generateData } from '../services/mocks.service'; // Ajusta la ruta según tu proyecto

let mockUsers: any[] = [];
let mockPets: any[] = [];
let mockAdoptions: any[] = [];
const apiURL = "http://localhost:8080/api";

before(async () => {
  let response = await fetch(`${apiURL}/mocks/mockingusers`);
  let result = await response.json();
  assert.equal(response.status, 200, "Failed to generate mock users");
  mockUsers = result.users;

  response = await fetch(`${apiURL}/mocks/mockingpets`);
  result = await response.json();
  assert.equal(response.status, 200, "Failed to generate mock pets");
  mockPets = result.pets;

  response = await fetch(`${apiURL}/mocks/mockingadoptions`);
  result = await response.json();
  assert.equal(response.status, 200, "Failed to generate mock adoptions");
  mockAdoptions = result.adoptions;
})

describe("USER API TESTS", () => {
  let userId: string | null = null;

  test("[POST] /users/create", async () => {
    const user = mockUsers[0];

    const response = await fetch(`${apiURL}/users/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const responseJson = await response.json();
    assert.ok(responseJson._id, "User ID should exist");
    assert.equal(response.status, 200);
    userId = responseJson._id;
  });

  test("[GET] /users", async () => {
    const response = await fetch(`${apiURL}/users`);
    const data = await response.json();
  
    assert.ok(data.users, "'users' field is missing in the response");
    
    assert.ok(Array.isArray(data.users), "Response should be an array of users");
    
    const user = data.users[0];
    assert.ok(user._id, "User should have an '_id'");
    assert.ok(user.name, "User should have a 'name'");
    assert.ok(user.email, "User should have an 'email'");
    assert.ok(user.password, "User should have a 'password'");
    assert.ok(user.role, "User should have a 'role'");
    
    assert.equal(response.status, 200);
  });

  test("[GET] /users/:id", async () => {
    const userId = mockUsers[0]._id;
    const response = await fetch(`${apiURL}/users/${userId}`);
    const data = await response.json();
    assert.equal(data.user._id, userId, "User ID should match");
    assert.equal(response.status, 200);
  });
});

describe("PET API TESTS", () => {
  let petId: string | null = null;

  test("[POST] /pets/create", async () => {
    const pet = mockPets[0];

    const response = await fetch(`${apiURL}/pets/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });

    const responseJson = await response.json();
    assert.ok(responseJson._id, "Pet ID should exist");
    assert.equal(response.status, 200);
    petId = responseJson._id;
  });

  test("[GET] /pets", async () => {
    const response = await fetch(`${apiURL}/pets`);
    const data = await response.json();
  
    assert.ok(data.pets, "'pets' field is missing in the response");
    
    assert.ok(Array.isArray(data.pets), "Response should be an array of pets");
    
    const pet = data.pets[0];
    assert.ok(pet._id, "User should have an '_id'");
    assert.ok(pet.name, "User should have a 'name'");
    assert.ok(pet.type, "User should have an 'type'");
    assert.ok(pet.owner, "User should have a 'owner'");
    
    assert.equal(response.status, 200);
  });
});

describe("ADOPTION API TESTS", () => {
  let adoptionId: string | null = null;

  test("[POST] /adoptions/create", async () => {
    const adoption = {
      userId: mockUsers[0]._id,
      petId: mockPets[0]._id,
    };
  
    const response = await fetch(`${apiURL}/adoptions/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adoption),
    });
  
    const responseJson = await response.json();
  
    assert.ok(responseJson.adoption, "'adoption' object should be in the response");
  
    assert.ok(responseJson.adoption._id, "Adoption ID should exist");
  
    assert.equal(responseJson.adoption.user, adoption.userId, "User ID should match");
    assert.equal(responseJson.adoption.pet, adoption.petId, "Pet ID should match");
  
    assert.equal(response.status, 200);
  
    adoptionId = responseJson.adoption._id;
  });
  

  test("[GET] /adoptions", async () => {
    const response = await fetch(`${apiURL}/adoptions`);
    const data = await response.json();
  
    assert.ok(data.adoptions, "'adoptions' field is missing in the response");
    
    assert.ok(Array.isArray(data.adoptions), "Response should be an array of adoptions");
    
    const adoption = data.adoptions[0];
    assert.ok(adoption._id, "Adoption should have an '_id'");
    assert.ok(adoption.user, "Adoption should have a 'user'");
    assert.ok(adoption.pet, "Adoption should have an 'pet'");
    assert.ok(adoption.adoptionDate, "Adoption should have a 'adoptionDate'");
    
    assert.equal(response.status, 200);
  });
});
