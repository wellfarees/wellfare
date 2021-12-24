import { useState, useEffect } from "react";
import { isSameWeek, subDays } from "date-fns";

interface LightRecap {
  records: {
    date: number;
  }[];
}

export const useRecap = (feedData: any): LightRecap => {
  const [recap, setRecap] = useState<LightRecap>();

  useEffect(() => {
    if (feedData) {
      const fetchedRecaps: LightRecap[] | null = feedData.getUser.recaps;
      if (!fetchedRecaps) {
        setRecap(null);
        return;
      }

      const lastRecap = fetchedRecaps[fetchedRecaps.length - 1];
      const lastDate = lastRecap.records[lastRecap.records.length - 1].date;

      const today = new Date();
      if (isSameWeek(subDays(today, 1), lastDate) && today.getDay() === 6) {
        setRecap(lastRecap);
      } else {
        setRecap(null);
      }
    }
  }, [feedData]);

  return recap;
};
