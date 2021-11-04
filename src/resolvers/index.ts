import getUser from "./getUser";
import company from "./company";
import ping from "./ping";
import createUser from "./createUser";
import login from "./login";

const Query = {
  ...ping.Query,
  ...company.Query,
  ...getUser.Query,
  ...login.Query,
};

const Mutation = {
  ...createUser.Mutation,
};

export default { Query, Mutation };
