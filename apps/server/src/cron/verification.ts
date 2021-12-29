import server from "../server";
import { Cron } from "../types/cron";
import { differenceInWeeks } from "date-fns";

export default abstract class VerifyUser extends Cron {
  constructor() {
    // run every day at 00:00
    super("* * * * * *");
  }

  async exec() {
    //   FIXME: its executing before the following statement, but not after it
    const data = await server.db.user.findFirst({
      where: {
        information: {
          verified: false,
          NOT: {
            email: null,
          },
        },
      },
    });

    for (const user of [data]) {
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
