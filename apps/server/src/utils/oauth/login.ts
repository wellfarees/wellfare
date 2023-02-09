import axios from "axios";

import { SIGNIN_METHODS } from "../../constants";
import { User } from "./types";

export const login = async (
  service: SIGNIN_METHODS,
  token: string
): Promise<User> => {
  switch (service) {
    case "google": {
      const res = await axios.get<{
        email: string;
        given_name: string;
        family_name: string;
        picture: string;
      }>(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);

      return {
        email: res.data.email,
        firstName: res.data.given_name,
        lastName: res.data.family_name,
        pfp: res.data.picture,
      };
    }
  }
};
