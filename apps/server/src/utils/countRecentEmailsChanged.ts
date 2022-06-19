import { differenceInHours } from "date-fns";

export interface EmailsChanged {
  address: string;
  set: Date;
  id: number;
}

export const countRecentEmailsChanged = (arr: EmailsChanged[]): number => {
  let changed = 0;

  for (const email of arr) {
    if (differenceInHours(email.set, Date.now()) < 24) {
      changed++;
    }
  }

  return changed;
};
