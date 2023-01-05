import UserDoesNotExistsError from "../errors/UserDoesNotExist";
import server from "../server";
import {
  User,
  Record,
  Configuration,
  Recap,
  Information,
  EncryptedAffirmations,
  EncryptedFeelsPiece,
  EncryptedGrPiece,
  EncryptedUneasePiece,
} from "@prisma/client";
import { decrypt } from "./crypto";

type ReturnUser = User & {
  records?: AdvancedRecord[];
  config?: Configuration;
  recaps: (Recap & {
    records: AdvancedRecord[];
  })[];
  information?: Information;
  encryptedAffirmations: EncryptedAffirmations;
};

interface Include {
  information?: boolean;
  config?: boolean;
  records?: boolean;
}

type AdvancedRecord = Record & {
  feelingsUpdated: EncryptedFeelsPiece;
  gratefulnessUpdated: EncryptedGrPiece;
  uneaseUpdated: EncryptedUneasePiece;
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
              feelingsUpdated: true,
              gratefulnessUpdated: true,
              uneaseUpdated: true,
            },
          },
        },
      },
      records: {
        include: {
          feelingsUpdated: true,
          gratefulnessUpdated: true,
          uneaseUpdated: true,
        },
      },

      encryptedAffirmations: true,
    },
  });

  if (!user)
    throw new UserDoesNotExistsError("User does not exist in database.");

  const decryptRecords = (records: AdvancedRecord[]): AdvancedRecord[] => {
    return records.map((record): AdvancedRecord => {
      return {
        ...record,
        feelings: decrypt(record.feelingsUpdated),
        gratefulness: decrypt(record.feelingsUpdated),
        unease: decrypt(record.uneaseUpdated),
      };
    });
  };

  const decryptedRecaps = user.recaps.map(
    (recap): Recap & { records: AdvancedRecord[] } => {
      return {
        ...recap,
        records: decryptRecords(recap.records as AdvancedRecord[]),
      };
    }
  );

  return {
    ...user,
    affirmations: decrypt(user.encryptedAffirmations),
    records: decryptRecords(user.records as AdvancedRecord[]).reverse(),
    recaps: decryptedRecaps,
  };
}

export { decryptSensitiveData };
