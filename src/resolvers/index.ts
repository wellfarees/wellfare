import company from "./company";
import ping from "./ping";

const Query = {
  ...ping.Query,
  ...company.Query,
};

const Mutation = {};

export default { Query, Mutation };
