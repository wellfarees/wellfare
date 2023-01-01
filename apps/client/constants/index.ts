import { CLIENT_URL } from "../endpoints";

const encodedClientURL = encodeURIComponent(CLIENT_URL);

export const GOOGLE_AUTH_LINK = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodedClientURL}%2Fauth%2Foauth%2Fgoogle&client_id=134603817540-vrkdl15in71u3t1mkt4pmhqsg8bdtvei.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email`;
export const FACEBOOK_AUTH_LINK = `https://www.facebook.com/v14.0/dialog/oauth?client_id=428966282383943&redirect_uri=http%3A%2F%2Fdomain.com%3A3000%2Fauth%2Foauth%2Ffacebook&state=123&scope=email%2Cpublic_profile`;
