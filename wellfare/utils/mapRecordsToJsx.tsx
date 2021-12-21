import { RecordsData } from "../components/Records/RecordTypes";
import Record from "../components/Records/Record";

export const mapRecordsToJsx = (records: RecordsData): JSX.Element[] => {
  return records.map((record, index) => {
    const { emoji, date, unease, feelings, gratefulness } = record;
    return (
      <div key={index}>
        <Record
          data={{
            date: new Date(date),
            unease: unease,
            gratefulness,
            emoji,
            feelings: `Feeling ${feelings}`,
          }}
        />
      </div>
    );
  });
};
