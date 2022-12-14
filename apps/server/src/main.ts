import server from "./server";
const os = require("os");
import * as dotenv from "dotenv";
dotenv.config();

server.listen().then((port): void => {
  console.log(`[Success] 🚀 Apollo Server is now running on port ${port}.`);
});
