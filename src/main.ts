/* eslint-disable import/first */
import * as dotenv from "dotenv";
import server from "./server";

dotenv.config();

server
  .listen()
  .then(({ url }): void =>
    console.log(`🚀 Apollo Server is now running at ${url}.`)
  );
