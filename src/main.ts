import * as dotenv from "dotenv";
import server from "./server";

dotenv.config();

server.listen().then(({ url }): void =>
  // eslint-disable-next-line no-console
  console.log(`🚀 Apollo Server is now running at ${url}.`)
);
