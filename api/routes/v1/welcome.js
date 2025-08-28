const Ajv = require("ajv");
const AjvErrors = require("ajv-errors");
const welcomeJsonSchema = require("../../schemas/v1/welcome.schema");
const { WelcomeService } = require("../../services/v1/welcome.service");

module.exports = async (fastify) => {
  const service = new WelcomeService(fastify);

  /**
   * configuration of Ajv (coerceTypes and strict)
   */
  const ajv = new Ajv({
    allErrors: true,
    coerceTypes: true,
    strict: false,
  });
  AjvErrors(ajv);

  /**
   * welcomeHandler Function
   * @param {request:object} request
   * @param {response:object} reply
   */
  async function welcomeHandler(request, reply) {
    const res = await service.welcomeHandlerService(request);
    reply.status(res.status).send(res.body);
  }

  /**
   * Route to our service handler when hit below endpoint
   */
  fastify.route({
    method: "GET",
    url: "/welcome",
    schema: welcomeJsonSchema,
    validatorCompiler: ({ schema }) => ajv.compile(schema),
    handler: welcomeHandler,
  });
};
