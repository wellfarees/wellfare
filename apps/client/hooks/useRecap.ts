import { useState, useEffect } from "react";
import { isSameWeek, subDays, startOfDay, subSeconds } from "date-fns";

interface LightRecap {
  id: number;
  records: {
    date: number;
  }[];
}

export const useRecap = (feedData: any): LightRecap => {
  const [recap, setRecap] = useState<LightRecap>();

  useEffect(() => {
    if (feedData) {
      const fetchedRecaps: LightRecap[] | null = feedData.getUser.recaps;

      if (!fetchedRecaps.length) {
        setRecap(null);
        return;
      }

      const lastRecap = fetchedRecaps[fetchedRecaps.length - 1];
      const lastDate = lastRecap.records[lastRecap.records.length - 1].date;
      const today = startOfDay(new Date());

      if (
        isSameWeek(subDays(today, 1), lastDate, { weekStartsOn: 1 }) &&
        today.getDay() === 1
      ) {
        setRecap(lastRecap);
      } else {
        setRecap(null);
      }
    }
  }, [feedData]);

  return recap;
};
