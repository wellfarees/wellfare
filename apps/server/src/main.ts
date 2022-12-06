import server from "./server";
const os = require("os");

const interfaces = os.networkInterfaces();

server.listen().then((port): void => {
  // eslint-disable-next-line no-console
  console.log(`[Success] 🚀 Apollo Server is now running on port ${port}.`);

  Object.keys(interfaces).forEach((name) => {
    const addresses = interfaces[name];

    addresses.forEach((address) => {
      console.log(`${name}: ${address.address}`);
    });
  });
});
