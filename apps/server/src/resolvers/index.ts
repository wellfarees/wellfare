import getUser from "./getUser";
import getRecap from "./getRecap";
import company from "./company";
import ping from "./ping";
import createUser from "./createUser";
import login from "./login";
import addRecord from "./addRecord";
import addAffirmations from "./addAffirmations";
import editAppearance from "./editAppearance";
import editInformation from "./editInformation";
import verifyUser from "./verifyUser";
import resendVerificationEmail from "./resendVerificationEmail";
import forgetPassword from "./resetPassword";
import addEmailToNewsletter from "./addEmailToNewsletter";
import getUserInformationFromEmailToken from "./getUserInformationFromEmailToken";

const Query = {
  ...ping.Query,
  ...company.Query,
  ...getUser.Query,
  ...getRecap.Query,
  ...login.Query,
  ...getUserInformationFromEmailToken.Query,
};

const Mutation = {
  ...createUser.Mutation,
  ...addRecord.Mutation,
  ...addAffirmations.Mutation,
  ...editAppearance.Mutation,
  ...editInformation.Mutation,
  ...verifyUser.Mutation,
  ...resendVerificationEmail.Mutation,
  ...forgetPassword.Mutation,
  ...addEmailToNewsletter.Mutation,
};

export default { Query, Mutation };
