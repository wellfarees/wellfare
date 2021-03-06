import styled from "styled-components";
import { formatDate } from "../../utils/formatDate";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useRouter } from "next/router";
import { useActions } from "../../hooks/useActions";
import DetailedRecord from "./DetailedRecord";

interface RecordProps {
  data: {
    emoji: string;
    date: number;
    feelings: string;
    gratefulness: string;
    unease: string;
    id: number;
  };
}

const Wrapper = styled.div`
  background-color: ${(props: any) => props.theme.banner};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
  padding: 3em;
  max-width: 400px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    filter: brightness(98%);
  }

  .date {
    position: absolute;
    left: 2em;
    top: -0.4em;
    color: ${(props: any) => props.theme.shadedColor};
  }

  .feelings-container {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .description {
    color: ${(props: any) => props.theme.shadedColor};
    line-height: 1.5em;
  }
`;

const Record: React.FC<RecordProps> = ({
  data: { date, feelings, emoji, unease, gratefulness, id },
}) => {
  const dateString = formatDate(date);
  const size = useScreenSize();
  const router = useRouter();
  const { initModal } = useActions();

  return (
    <Wrapper
      onClick={() => {
        const RecordContent = (
          <DetailedRecord
            data={{
              date: date,
              emoji,
              feelings,
              gratefulness,
              unease,
            }}
          />
        );
        if (size! > 425 && !(size! <= 812 && window.innerHeight <= 425)) {
          initModal(true, RecordContent);
          return;
        }

        // TODO: redirect to the record with the appropriate (fetched) id
        router.push(`/app/records/${id}`);
      }}
    >
      <span className="date">{dateString}</span>
      <div className="feelings-container">
        <span className="emoji">{emoji}</span>
        <h4 className="feelings">{feelings}</h4>
      </div>
      <p className="description">{unease}</p>
    </Wrapper>
  );
};

export default Record;
