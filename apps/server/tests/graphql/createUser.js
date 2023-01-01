"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@urql/core");
const Utilities_1 = __importDefault(require("../utils/Utilities"));
const uvu_1 = require("uvu");
const assert = __importStar(require("uvu/assert"));
const bcrypt_1 = require("bcrypt");
(0, uvu_1.test)("createUser", async () => {
    const email = Math.random() + "@example.com";
    const result = await Utilities_1.default.client
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
        email,
        password: "password",
    })
        .toPromise();
    assert.equal(result.data.createUser.user.information.firstName +
        " " +
        result.data.createUser.user.information.lastName, "Hello World");
    assert.equal(result.data.createUser.user.information.email, email);
    assert.ok(await (0, bcrypt_1.compare)("password", result.data.createUser.user.information.password));
});
uvu_1.test.run();
//# sourceMappingURL=createUser.js.map