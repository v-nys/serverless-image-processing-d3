'use strict'

const jimp = require("jimp");

module.exports = async (event, context) => {
  const auth_header = event.headers.authorization;
  const environment = process.env.NODE_ENV;
  let secret_token;
  if (environment === "test") {
    secret_token = "my-serverless-secret";
  } else if (environment === "production") {
    secret_token = await readFile("/var/openfaas/secrets/imageprocessingtoken");
  }  
  if (auth_header && auth_header.startsWith("Bearer ")) {
    const token = auth_header.substring(7);
    if (token === secret_token) {
      const base64Input = event.body;
      const inputBuffer = Buffer.from(base64Input, "base64");
      const jimpValue = await jimp.read(inputBuffer);
      const outputBuffer = await jimpValue.greyscale().getBufferAsync(jimp.MIME_PNG);
      const base64Output = outputBuffer.toString("base64");
      return context
        .status(200)
        .succeed(base64Output);
    }
  }
}
