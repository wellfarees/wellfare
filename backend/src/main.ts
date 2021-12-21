import server from "./server";

server.listen().then(({ url }): void =>
  // eslint-disable-next-line no-console
  console.log(`[Success] 🚀 Apollo Server is now running at ${url}.`)
);
