import getUser from "./getUser";
import getRecap from "./getRecap";
import getRecord from "./getRecord";
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
import restoreEmail from "./restoreEmail";
import pfpUpload from "./pfpUpload";
import forgetPassword from "./resetPassword";
import verifyJWT from "./verifyJWT";
import changePassword from "./changePassword";
import addEmailToNewsletter from "./addEmailToNewsletter";
import getUserInformationFromEmailToken from "./getUserInformationFromEmailToken";
import oAauthLogin from "./oauth/login";
import changeToNative from "./changeToNative";
import unsubscribe from "./unsubscribe";
import getSearchHits from "./getSearchHits";

const Query = {
  ...ping.Query,
  ...company.Query,
  ...getUser.Query,
  ...getRecap.Query,
  ...getRecord.Query,
  ...login.Query,
  ...verifyJWT.Query,
  ...getUserInformationFromEmailToken.Query,
  ...getSearchHits.Query,
};

const Mutation = {
  ...createUser.Mutation,
  ...addRecord.Mutation,
  ...addAffirmations.Mutation,
  ...editAppearance.Mutation,
  ...editInformation.Mutation,
  ...verifyUser.Mutation,
  ...resendVerificationEmail.Mutation,
  ...restoreEmail.Mutation,
  ...forgetPassword.Mutation,
  ...changePassword.Mutation,
  ...addEmailToNewsletter.Mutation,
  ...pfpUpload.Mutation,
  ...oAauthLogin.Mutation,
  ...changeToNative.Mutation,
  ...unsubscribe.Mutation,
};

const Upload = pfpUpload.Upload;

export default { Query, Mutation, Upload };
