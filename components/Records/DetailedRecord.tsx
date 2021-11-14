import styled from "styled-components";
import { formatDate } from "../../utils/formatDate";

interface RecordProps {
  data: {
    date: number;
    feelings: string;
    unease: string;
    gratefulness: string;
    emoji: string;
  };
}

const Wrapper = styled.div`
  h3 {
    margin: 0.5em 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 3em;
    margin-top: 3em;
  }

  .info-block {
    p.name {
      font-weight: 700;
      margin-bottom: 0.5em;
    }

    p.descr {
      line-height: 1.5;
    }
  }
`;

const DetailedRecord: React.FC<RecordProps> = ({
  data: { date, emoji, unease, gratefulness, feelings },
}) => {
  return (
    <Wrapper>
      <p className="date">{formatDate(new Date(date))}</p>
      <h3>{feelings}</h3>
      <div className="info">
        <div className="info-block">
          <p className="name">Unease</p>
          <p className="descr">{unease}</p>
        </div>
        <div className="info-block">
          <p className="name">Gratefulness</p>
          <p className="descr">{gratefulness}</p>
        </div>
        <div className="emojis">
          <p>
            <b>Summarized with</b> <span>{emoji}</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default DetailedRecord;
