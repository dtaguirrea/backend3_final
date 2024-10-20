export const info = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API AdoptPet",
        version: "1.0.0",
        description: "API de adopcion de mascotas",
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./src/docs/*.yml"],
  };