const welcomeHeaderJsonSchema = {
  type: "object",
  additionalProperties: true,
  properties: {
    "x-user-id": {
      description: "Unique User Id",
      type: "string",
      minLength: 1,
      example: "user1",
    },
  },
  required: ["x-user-id"],
};
const welcomeJsonSchema = {
  type: "object",
  summary: "Welcome Schema",
  title: "Welcome Schema",
  description: "Welcome schema for welcome service",
  additionalProperties: true,
  headers: welcomeHeaderJsonSchema,
  response: {
    200: {
      description: "Successful Response",
      type: "object",
      additionalProperties: true,
      properties: {
        welcome: {
          type: "string",
        },
      },
      example: {
        example: {
          welcome: "This is NodeJS-Fastify API Boilerplate.",
        },
      },
    },
  },
};

module.exports = welcomeJsonSchema;
