import server from "./server";

server.listen().then((port): void =>
  // eslint-disable-next-line no-console
  console.log(`[Success] 🚀 Apollo Server is now running on port ${port}.`)
);
