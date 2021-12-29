import server from "../server";
import { Cron } from "../types/cron";
import { differenceInWeeks } from "date-fns";

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
          NOT: {
            email: null,
          },
        },
      },
    });

    for (const user of data) {
      if (differenceInWeeks(new Date(), user.emailLastUpdated) == 2) {
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
        });
      }
    }
  }
}
