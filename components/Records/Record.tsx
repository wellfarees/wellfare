import styled from "styled-components";
import { formatDate } from "../../utils/formatDate";

interface RecordProps {
  data: {
    emoji: string;
    date: Date;
    feelings: string;
    description: string;
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
  data: { date, feelings, emoji, description },
}) => {
  const dateString = formatDate(date);

  return (
    <Wrapper>
      <span className="date">{dateString}</span>
      <div className="feelings-container">
        <span className="emoji">{emoji}</span>
        <h4 className="feelings">{feelings}</h4>
      </div>
      <p className="description">{description}</p>
    </Wrapper>
  );
};

export default Record;
