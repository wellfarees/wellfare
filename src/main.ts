/* eslint-disable import/first */
import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";

server
  .listen()
  .then(({ url }): void =>
    console.log(`🚀 Apollo Server is now running at ${url}.`)
  );
