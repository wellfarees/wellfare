import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import {
  User,
  Configuration,
  Recap,
  Information,
  EncryptedAffirmations,
  EncryptedFeelsPiece,
  EncryptedGrPiece,
  EncryptedUneasePiece,
  Record,
} from "@prisma/client";

import { decrypt } from "./crypto";

export type ChangeTypeOfKeys<
  T extends object,
  Keys extends keyof T,
  NewType
> = {
  [key in keyof T]: key extends Keys ? NewType : T[key];
};

type AcceptUser = User & {
  records?: EncryptedRecord[] | Record[];
  config?: Configuration;
  recaps?: (Recap & {
    records: EncryptedRecord[] | Record[];
  })[];
  information?: Information;
  encryptedAffirmations?: EncryptedAffirmations;
  affirmations?: string;
};

type ReturnUser = ChangeTypeOfKeys<
  ChangeTypeOfKeys<AcceptUser, "records", DecryptedRecord[]>,
  "recaps",
  (Recap & { records: DecryptedRecord[] })[]
>;

type EncryptedRecord = Record & {
  feelings: EncryptedFeelsPiece;
  gratefulness: EncryptedGrPiece;
  unease: EncryptedUneasePiece;
};

type DecryptedRecord = Record & {
  feelings: string;
  gratefulness: string;
  unease: string;
};

async function decryptSensitiveData(user: AcceptUser): Promise<ReturnUser> {
  if (!user)
    throw new UserDoesNotExistsError("User does not exist in database.");

  const decryptRecords = (records: EncryptedRecord[]): DecryptedRecord[] => {
    return records.map((record): DecryptedRecord => {
      return {
        ...record,
        feelings: decrypt(record.feelings),
        gratefulness: decrypt(record.feelings),
        unease: decrypt(record.unease),
      };
    });
  };

  const decryptedRecaps = user.recaps
    ? user.recaps.map((recap): Recap & { records: DecryptedRecord[] } => {
        return {
          ...recap,
          records: decryptRecords(recap.records as EncryptedRecord[]).reverse(),
        };
      })
    : [];

  return {
    ...user,
    affirmations:
      user.encryptedAffirmations && decrypt(user.encryptedAffirmations),
    records: user.records
      ? decryptRecords(user.records as EncryptedRecord[]).reverse()
      : [],
    recaps: decryptedRecaps,
  };
}

export { decryptSensitiveData };
