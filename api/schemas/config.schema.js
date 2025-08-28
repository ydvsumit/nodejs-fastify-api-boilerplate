const configSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    APP_PORT: {
      description: "Port Number of Application",
      type: "integer",
    },
    APP_HOST_IP: {
      description: "Host IP of Application",
      type: "string",
      default: "0.0.0.0",
    },
  },
  required: ["APP_PORT", "APP_HOST_IP"],
};

module.exports = configSchema;
