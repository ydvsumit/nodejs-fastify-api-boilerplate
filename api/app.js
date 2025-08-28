/**
 * Creating a Fastify Server:
 * Order in Fastify plugins register / load
 * 1. Plugins (from the fastify ecosystem)
 * 2. Our plugins (custom plugins)
 * 3. Decorators
 * 4. Hooks and middlewares
 * 5. Routes
 */
const fastify = require("fastify");
const AutoLoad = require("@fastify/autoload");
const path = require("path");

// NOT REQUIRED (Because fastify/env checks environment variable by using env schema)
// require("dotenv").config();
// console.log(process.env); // remove this after you've confirmed it is working

/**
 * Build Server Setup - Fastify Server Plugins Register
 * @param {object} opts
 * @returns Fastify Object
 */
const buildServer = async (opts) => {
  const Fastify = fastify({
    logger: true,
    ajv: {
      customOptions: {
        allErrors: true,
        addKeywords: false,
      },
    },
  });

  Fastify.register(AutoLoad, {
    dir: path.join(__dirname, "configs"),
    options: { ...opts },
  })
    .register(AutoLoad, {
      dir: path.join(__dirname, "plugins"),
      options: { ...opts },
    })
    .register(AutoLoad, {
      dir: path.join(__dirname, "routes/v1"),
      options: { prefix: "/api/v1", ...opts },
    })
    .register(AutoLoad, {
      dir: path.join(__dirname, "routes/v2"),
      options: { prefix: "/api/v2", ...opts },
    });
  return Fastify;
};

/**
 * Run the created above Server:
 */
buildServer()
  .then((instance) => {
    console.log(instance.printRoutes());

    const serverOptions = {
      port: instance.config.APP_PORT,
      host: instance.config.APP_HOST_IP,
    };

    //Run the Server
    instance.listen(serverOptions, (err) => {
      if (err) {
        instance.log.fatal(err);
        process.exit(1);
      }

      process.on("SIGINT", () => instance.close());
      process.on("SIGTERM", () => instance.close());
    });
  })
  .catch((err) => {
    if (err) {
      console.error(err);
    }
  });
