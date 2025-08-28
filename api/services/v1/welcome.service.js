class WelcomeService {
  constructor(fastify) {
    this.fastify = fastify;
  }

  welcomeHandlerService = async (data) => {
    this.fastify.log.trace("welcomeHandlerService - starts");
    this.fastify.log.debug("welcomeHandlerService - Request Data: %s", data);
    const response = {
      status: 200,
      body: {
        welcome: "This is NodeJS-Fastify API Boilerplate.",
      },
    };
    this.fastify.log.trace("welcomeHandlerService - ends");
    return response;
  };
}

module.exports = { WelcomeService };
