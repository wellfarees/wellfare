import { Client, createClient, gql } from "@urql/core";
import fetch from "cross-fetch";

class Utilities {
  client: Client;
  information?: {
    jwt: string;
    email: string;
    password: string;
  };
  private email: string;

  constructor() {
    this.client = createClient({
      url: "http://localhost:4000/",
      fetch,
    });
    this.email = Math.random() + "@example.com";
    this.createUser();
  }

  async createUser() {
    const result = await this.client
      .mutation(
        gql`
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
        `,
        {
          name: "Hello World",
          email: this.email,
          password: "password",
        }
      )
      .toPromise();

    this.information = {
      email: result.data.createUser.user.information.email,
      password: result.data.createUser.user.information.password,
      jwt: result.data.createUser.jwt,
    };
  }
}

const utils = new Utilities();
export default utils;
