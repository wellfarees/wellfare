"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@urql/core");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class Utilities {
    constructor() {
        this.client = (0, core_1.createClient)({
            url: "http://localhost:4000/",
            fetch: cross_fetch_1.default,
        });
        this.email = Math.random() + "@example.com";
        this.createUser();
    }
    async createUser() {
        const result = await this.client
            .mutation((0, core_1.gql) `
          mutation ($name: String!, $email: String!, $password: String!) {
            createUser(name: $name, email: $email, password: $password) {
              jwt
              user {
                information {
                  firstName
                  lastName
                  email
                  password
                }
              }
            }
          }
        `, {
            name: "Hello World",
            email: this.email,
            password: "password",
        })
            .toPromise();
        this.information = {
            email: result.data.createUser.user.information.email,
            password: result.data.createUser.user.information.password,
            jwt: result.data.createUser.jwt,
        };
    }
}
const utils = new Utilities();
exports.default = utils;
//# sourceMappingURL=Utilities.js.map