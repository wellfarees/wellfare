import server from "../server";
import { Cron } from "../types/cron";
import { subDays } from "date-fns";

export default abstract class VerifyUser extends Cron {
  constructor() {
    // run every day at 00:00
    super("0 0 * * *");
  }

  async exec() {
    const data = await server.db.user.findMany({
      where: {
        information: {
          verified: false,
          AND: {
            email: {
              not: null,
            },
          },
        },
        AND: {
          emailLastUpdated: {
            lte: subDays(new Date(), 7),
          },
        },
      },
    });

    for (const user of data) {
      await server.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          information: {
            update: {
              email: null,
            },
          },
        },
        include: {
          information: true,
        },
      });
    }
  }
}
