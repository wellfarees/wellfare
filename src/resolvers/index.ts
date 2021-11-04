import getUser from "./getUser";
import company from "./company";
import ping from "./ping";
import createUser from "./createUser";
import login from "./login";
import addRecord from "./addRecord";

const Query = {
  ...ping.Query,
  ...company.Query,
  ...getUser.Query,
  ...login.Query,
};

const Mutation = {
  ...createUser.Mutation,
  ...addRecord.Mutation,
};

export default { Query, Mutation };
