import styled from "styled-components";

interface ExistsNotProps {
  name: string;
}

const Wrapper = styled.div`
  height: 85vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  h1 {
    line-height: 1.5;
    font-weight: 800;
    margin-top: -1em;
  }

  p {
    margin-top: 0.6em;
    line-height: 2;
    max-width: 350px;
  }
`;

const ExistsNot: React.FC<ExistsNotProps> = ({ name }) => {
  return (
    <Wrapper>
      <h1>This {name} does not exist.</h1>
      <p>
        The resource you are trying to access could not be found in out
        database.
      </p>
    </Wrapper>
  );
};

export default ExistsNot;
