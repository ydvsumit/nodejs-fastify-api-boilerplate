const fp = require("fastify-plugin");
const configSchema = require("../schemas/config.schema");

module.exports = fp(async (fastify) => {
  fastify.register(require("@fastify/env"), {
    configKey: "config",
    schema: configSchema,
    dotenv: true,
  });
});
