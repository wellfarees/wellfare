const development = process.env.NODE_ENV !== "production";

export const SERVER_URL = development
  ? "http://localhost:4000"
  : "https://wellfare-server.onrender.com";
<<<<<<< HEAD

export const CLIENT_URL = development
  ? "http://localhost:3000"
  : "https://development.dc2dwwp55mwts.amplifyapp.com";

console.log(CLIENT_URL);
=======
>>>>>>> parent of 399e194... add production urls to client
