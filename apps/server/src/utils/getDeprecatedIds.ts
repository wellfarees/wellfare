import { differenceInHours } from "date-fns";
import { EmailsChanged } from "./countRecentEmailsChanged";

export const getDeprecatedIds = (arr: EmailsChanged[]): number[] => {
  return arr
    .filter((email) => differenceInHours(email.set, Date.now()) > 24)
    .map((email) => email.id);
};
