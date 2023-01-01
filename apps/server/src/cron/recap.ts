import server from "../server";
import { Cron } from "../types/cron";
import getWeekDays from "../utils/getWeekDays";
import { generateRecapFromEmojis } from "../utils/recapGenerator";
import subDays from "date-fns/subDays";

export default abstract class SendRecap extends Cron {
  constructor() {
    super("0 0 * * MON");
  }

  async exec() {
    const daysOfWeek = getWeekDays(subDays(new Date(), 1));

    const data = await server.db.user.findMany({
      include: {
        records: {
          where: {
            date: {
              gte: daysOfWeek[daysOfWeek.length - 1],
              lte: daysOfWeek[0],
            },
          },
        },
        information: true,
        recaps: true,
        config: true,
      },
    });

    for (const user of data) {
      if (user.records.length < 4) continue;

      const emojis: string[] = [];
      user.records.forEach((record) => emojis.push(record.emoji));

      const recap = generateRecapFromEmojis(emojis, user.lastIndex);
      const ids = user.records.map((num) => {
        return { id: num.id };
      });

      await server.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          lastIndex: recap.indexUsed,
          recaps: {
            create: {
              description: recap.recap,
              startDate: daysOfWeek[daysOfWeek.length - 1],
              endDate: daysOfWeek[2],
              records: {
                connect: ids,
              },
            },
          },
        },
      });
    }
  }
}
