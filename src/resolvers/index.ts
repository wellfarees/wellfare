import getUser from "./getUser";
import company from "./company";
import ping from "./ping";
import createUser from "./createUser";
import login from "./login";
import addRecord from "./addRecord";
import addAffirmations from "./addAffirmations";
import editAppearance from "./editAppearance";
import editInformation from "./editInformation";
import verifyUser from "./verifyUser";

const Query = {
  ...ping.Query,
  ...company.Query,
  ...getUser.Query,
  ...login.Query,
};

const Mutation = {
  ...createUser.Mutation,
  ...addRecord.Mutation,
  ...addAffirmations.Mutation,
  ...editAppearance.Mutation,
  ...editInformation.Mutation,
  ...verifyUser.Mutation,
};

export default { Query, Mutation };
