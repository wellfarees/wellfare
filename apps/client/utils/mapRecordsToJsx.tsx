import { RecordsData } from "../components/Records/RecordTypes";
import Record from "../components/Records/Record";

export const mapRecordsToJsx = (records: RecordsData): JSX.Element[] => {
  return records.map((record, index) => {
    const { emoji, date, unease, feelings, gratefulness, id } = record;
    return (
      <div key={index}>
        <Record
          data={{
            id,
            date: date,
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
