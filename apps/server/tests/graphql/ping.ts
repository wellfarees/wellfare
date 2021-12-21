import { test } from "uvu";
import * as assert from "uvu/assert";
import { gql } from "@urql/core";
import utils from "../utils/Utilities";

test("ping", async () => {
  const result = await utils.client
    .query(
      gql`
        query {
          ping
        }
      `
    )
    .toPromise();

  assert.equal(result.data.ping, "Pong!");
});

test.run();
