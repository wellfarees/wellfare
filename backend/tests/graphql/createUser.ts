import { gql } from "@urql/core";
import utils from "../utils/Utilities";
import { test } from "uvu";
import * as assert from "uvu/assert";
import { compare } from "bcrypt";

test("createUser", async () => {
  const email = Math.random() + "@example.com";
  const result = await utils.client
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
        email,
        password: "password",
      }
    )
    .toPromise();

  assert.equal(
    result.data.createUser.user.information.firstName +
      " " +
      result.data.createUser.user.information.lastName,
    "Hello World"
  );
  assert.equal(result.data.createUser.user.information.email, email);
  assert.ok(
    await compare("password", result.data.createUser.user.information.password)
  );
});

test.run();
