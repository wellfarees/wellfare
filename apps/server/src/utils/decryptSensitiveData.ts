import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
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

type ReturnUser = User & {
  records?: DecryptedRecord[];
  config?: Configuration;
  recaps: (Recap & {
    records: DecryptedRecord[];
  })[];
  information?: Information;
  encryptedAffirmations: EncryptedAffirmations;
  affirmations?: string;
};

interface Include {
  information?: boolean;
  config?: boolean;
  records?: boolean;
}

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

async function decryptSensitiveData(
  id: string,
  include?: Include
): Promise<ReturnUser> {
  const user = await server.db.user.findFirst({
    where: {
      id,
    },
    include: {
      information: include ? Boolean(include.information) : true,
      config: include ? Boolean(include.config) : true,
      recaps: {
        include: {
          records: {
            include: {
              feelings: true,
              gratefulness: true,
              unease: true,
            },
          },
        },
      },
      records: {
        include: {
          feelings: true,
          gratefulness: true,
          unease: true,
        },
      },

      encryptedAffirmations: true,
    },
  });

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

  const decryptedRecaps = user.recaps.map(
    (recap): Recap & { records: DecryptedRecord[] } => {
      return {
        ...recap,
        records: decryptRecords(recap.records as EncryptedRecord[]).reverse(),
      };
    }
  );

  return {
    ...user,
    affirmations:
      user.encryptedAffirmations && decrypt(user.encryptedAffirmations),
    records: decryptRecords(user.records as EncryptedRecord[]).reverse(),
    recaps: decryptedRecaps,
  };
}

export { decryptSensitiveData };
