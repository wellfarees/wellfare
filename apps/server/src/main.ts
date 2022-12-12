import server from "./server";
const os = require("os");

server.listen().then((port): void => {
  console.log(`[Success] 🚀 Apollo Server is now running on port ${port}.`);
});
